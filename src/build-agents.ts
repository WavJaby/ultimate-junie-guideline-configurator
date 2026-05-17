#!/usr/bin/env bun
/**
 * build-agents.ts
 * Builds AGENTS.md for Junie plugin or ACP Agent from source files.
 *
 * Usage:
 * bun src/build-agents.ts
 * bun src/build-agents.ts -target plugin
 * bun src/build-agents.ts -target acp
 * bun src/build-agents.ts -model claude-opus-4-6
 * bun src/build-agents.ts -debug
 */

import { cpSync, mkdirSync, readdirSync, rmSync } from 'fs';
import { exists } from 'fs/promises';
import { join, relative } from 'path';

// Parse Configuration & CLI Arguments
const DEFAULT_MODEL = 'gemini-3-1-pro';
const DEFAULT_TARGET = 'all';
const DEFAULT_BUILD_PATH = 'build';

const args = process.argv.slice(2);
const modelFlagIdx = args.indexOf('-model');
const targetFlagIdx = args.indexOf('-target');
const projectFlagIdx = args.indexOf('-project');

const model = modelFlagIdx !== -1 ? args[modelFlagIdx + 1] : DEFAULT_MODEL;
const target = targetFlagIdx !== -1 ? args[targetFlagIdx + 1] : DEFAULT_TARGET;

const projectPaths: string[] = [];
if (projectFlagIdx !== -1) {
    for (let i = projectFlagIdx + 1; i < args.length; i++) {
        if (args[i]!.startsWith('-')) break;
        projectPaths.push(args[i]!);
    }
}

const debug = args.includes('-debug');
const withLinks = args.includes('-links');

if (projectPaths.length > 0 && targetFlagIdx === -1) {
    console.error('Error: -project flag requires -target to be specified.');
    process.exit(1);
}

// Set Up Paths
const configRoot = join(import.meta.dir, '..');
const src = join(import.meta.dir);
const modelPath = join(src, 'models', `${model}.md`);
if (modelFlagIdx !== -1 && !model)
    console.warn(`⚠ Model not specified, defaulting to '${DEFAULT_MODEL}'`);

if (!(await Bun.file(modelPath).exists())) {
    console.error(`Error: Model file not found: ${modelPath}`);
    process.exit(1);
}

// Core Helper Functions
async function read(path: string): Promise<string | null> {
    if (!(await Bun.file(path).exists())) { console.warn(`⚠ Missing: ${path}`); return null; }
    const content = (await Bun.file(path).text()).trim();
    // Strip YAML frontmatter (--- ... ---) before inlining
    let text = content.replace(/^---[\s\S]*?---\n?/, '').trim();
    
    if (withLinks) {
        const match = text.match(/^(#+)\s+(.*)$/m);
        if (match) {
            const relPath = relative(configRoot, path).replace(/\\/g, '/');
            text = text.replace(/^(#+)\s+(.*)$/m, `$1 [$2](./${relPath})`);
        }
    }
    
    return text;
}

async function merge(paths: string[]): Promise<string> {
    const results = await Promise.all(paths.map(p => read(p)));
    return results.filter(Boolean).join('\n\n') + '\n';
}

function sharedRuleFiles(): string[] {
    return readdirSync(join(src, 'rules'))
        .filter(f => f.endsWith('.md'))
        .map(f => join(src, 'rules', f));
}

async function platformRuleFiles(platform: string): Promise<string[]> {
    const dir = join(src, platform, 'rules');
    if (!(await exists(dir))) return [];
    return readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .map(f => join(dir, f));
}

// Determines the base directory and log label based on whether a project path is used.
function getTargetInfo(targetName: string, pPath: string | null) {
    const baseDir = pPath ? pPath : join(configRoot, DEFAULT_BUILD_PATH, targetName);
    const label = pPath ? pPath : targetName;
    return { baseDir, label };
}

// Appends debug and project context files if they're applicable.
async function addOptionalFiles(files: string[], pPath: string | null) {
    if (debug) files.push(join(src, 'debug.md'));

    if (pPath) {
        const projectMdPath = join(pPath, '.junie', 'PROJECT.md');
        if (await Bun.file(projectMdPath).exists()) {
            files.push(projectMdPath);
        }
    }
}

// Automates the generation and logging of the merged AGENTS.md.
async function generateAgentsMd(targetName: string, files: string[], pPath: string | null) {
    const localFiles = [...files];
    await addOptionalFiles(localFiles, pPath);

    const { baseDir, label } = getTargetInfo(targetName, pPath);
    const outDir = join(baseDir, '.junie');

    if (!(await exists(outDir))) mkdirSync(outDir, { recursive: true });

    await Bun.write(join(outDir, 'AGENTS.md'), await merge(localFiles));
    console.log(`✓ ${label}/.junie/AGENTS.md (model: ${model}${debug ? ', debug' : ''}, ${localFiles.length} sources)`);
}

/** Quick helper to inline skills from a given directory. */
async function appendSkills(files: string[], skillsDir: string) {
    if (await exists(skillsDir)) {
        for (const skill of readdirSync(skillsDir)) {
            files.push(join(skillsDir, skill, 'SKILL.md'));
        }
    }
}

// Main Build Routines
async function buildPlugin() {
    const files = [
        join(src, 'base.md'),
        ...(debug ? [] : [join(src, 'confidentiality.md')]),
        ...sharedRuleFiles(),
        ...(await platformRuleFiles('junie_plugin')),
        modelPath,
    ];

    // Skills intro + inlined skills
    files.push(join(src, 'junie_plugin', 'skills-intro.md'));
    await appendSkills(files, join(src, 'skills'));
    await appendSkills(files, join(src, 'junie_plugin', 'skills'));

    if (projectPaths.length > 0) {
        for (const pPath of projectPaths) {
            await generateAgentsMd('plugin', files, pPath);
        }
    } else {
        await generateAgentsMd('plugin', files, null);
    }
}

async function buildAcp() {
    const files = [
        join(src, 'base.md'),
        ...(debug ? [] : [join(src, 'confidentiality.md')]),
        modelPath,
    ];

    const runAcpForProject = async (pPath: string | null) => {
        await generateAgentsMd('acp', files, pPath);

        const { baseDir, label } = getTargetInfo('acp', pPath);

        // shared rules + ACP rules → .aiassistant/rules/
        const aiRulesDir = join(baseDir, '.aiassistant', 'rules');
        if (await exists(aiRulesDir)) rmSync(aiRulesDir, { recursive: true });
        mkdirSync(aiRulesDir, { recursive: true });

        const ruleFiles = readdirSync(join(src, 'rules')).filter(f => f.endsWith('.md'));
        for (const f of ruleFiles) cpSync(join(src, 'rules', f), join(aiRulesDir, f));
        const acpPlatformRules = await platformRuleFiles('junie_acp');
        for (const f of acpPlatformRules) cpSync(f, join(aiRulesDir, f.split(/[\\/]/).pop()!));
        console.log(`  Rules: ${ruleFiles.length + acpPlatformRules.length} files → ${label}/.aiassistant/rules/`);

        // shared skills only → .agents/skills/
        const sharedSkillsDir = join(src, 'skills');
        const agentSkillsDir = join(baseDir, '.agents', 'skills');

        if (await exists(sharedSkillsDir)) {
            if (await exists(agentSkillsDir)) rmSync(agentSkillsDir, { recursive: true });
            // mkdirSync(agentSkillsDir, { recursive: true });
            cpSync(sharedSkillsDir, agentSkillsDir, { recursive: true });
            console.log(`  Skills: ${readdirSync(sharedSkillsDir).length} skill(s) → ${label}/.agents/skills/`);
        }
    };

    if (projectPaths.length > 0) {
        for (const pPath of projectPaths) {
            await runAcpForProject(pPath);
        }
    } else {
        await runAcpForProject(null);
    }
}

if (target === 'plugin' || target === 'all') await buildPlugin();
if (target === 'acp' || target === 'all') await buildAcp();