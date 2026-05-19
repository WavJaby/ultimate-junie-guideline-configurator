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

import {cpSync, mkdirSync, readdirSync, rmSync} from 'fs';
import {exists} from 'fs/promises';
import {join, relative} from 'path';
import {basename} from 'node:path';

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
const modelFile: FileInfo = {type: 'model', path: join(src, 'models', `${model}.md`)};
if (modelFlagIdx !== -1 && !model)
    console.warn(`⚠ Model not specified, defaulting to '${DEFAULT_MODEL}'`);

if (!(await Bun.file(modelFile.path).exists())) {
    console.error(`Error: Model file not found: ${modelFile.path}`);
    process.exit(1);
}

type FileInfo = {
    // Absolute path
    path: string;
    type: 'base' | 'project' | 'model' | 'rule' | 'workflow' | 'skill-intro' | 'skill' | 'guardrail',
    disable?: boolean,
    entry?: boolean;
} | {
    path?: string;
    type: 'rule-begin' | 'rule-end' | 'skill-end',
    disable?: boolean,
    entry?: boolean;
}

// Core Helper Functions
async function read(info: FileInfo): Promise<string | null> {
    if (info.type === 'rule-begin')
        return '<rules>';
    else if (info.type === 'rule-end')
        return '</rules>';
    else if (info.type === 'skill-end')
        return '</skills>';

    const absolutePath = info.path!;

    if (!(await Bun.file(absolutePath).exists())) {
        console.warn(`⚠ Missing: ${absolutePath}`);
        return null;
    }
    const content = (await Bun.file(absolutePath).text()).trim();
    // Strip YAML frontmatter (--- ... ---) before inlining
    let text = content.replace(/^---[\s\S]*?---\n?/, '').trim();

    if (info.type === 'base')
        return text;

    const entryPoint = info.entry ? 'ENTRY_POINT ' : '';
    let flag = '';
    let ruleName = basename(absolutePath);

    const match = text.match(/^(#+)\s+([^\[\r\n]+)(\[.+])?$/m);
    if (match && match[2]) {
        ruleName = match[2].trim();
        text = text.substring((match.index ?? 0) + match[0].length).trim();

        if (match[3]) {
            flag = match[3].substring(1, match[3].length - 1).trim() + ' ';
        }
    }

    const relPath = relative(configRoot, absolutePath).replace(/\\/g, '/');
    const filePath = withLinks ? ` file="${relPath}"` : '';

    if (!text.startsWith('<'))
        text = '\n' + text;

    if (info.type === 'skill-intro')
        return `<skills ${entryPoint}${flag}name="${ruleName}"${filePath}>\n${text}\n\n`;

    return `<${info.type} ${entryPoint}${flag}name="${ruleName}"${filePath}>\n${text}\n\n</${info.type}>`;
}

async function merge(files: FileInfo[]): Promise<string> {
    const results = await Promise.all(files.filter(f => !f.disable).map(f => read(f)));
    return results.filter(Boolean).join('\n') + '\n';
}

function sharedRuleFiles(): FileInfo[] {
    return readdirSync(join(src, '03_rules'))
        .filter(f => f.endsWith('.md'))
        .map(f => ({type: 'rule', path: join(src, '03_rules', f)}));
}

async function platformRuleFiles(platform: string): Promise<FileInfo[]> {
    const dir = join(src, platform, 'rules');
    if (!(await exists(dir))) return [];
    return readdirSync(dir)
        .filter(f => f.endsWith('.md'))
        .map(f => ({type: 'rule', path: join(dir, f)}));
}

async function getSkillFiles(skillFolder: string): Promise<FileInfo[]> {
    const dir = join(src, skillFolder);
    if (!(await exists(dir))) return [];
    return readdirSync(dir)
        .map(subDir => readdirSync(join(dir, subDir))
            .filter(f => f.endsWith('.md'))
            .map(f => join(dir, subDir, f)))
        .flatMap(paths => paths)
        .map(path => ({type: 'skill', path: path}));
}

async function getSkillFolder(skillFolder: string): Promise<string[]> {
    const dir = join(src, skillFolder);
    if (!(await exists(dir))) return [];
    return readdirSync(dir)
        .map(subDir => join(dir, subDir));
}

// Determines the base directory and log label based on whether a project path is used.
function getTargetInfo(targetName: string, pPath: string | null) {
    const baseDir = pPath ? pPath : join(configRoot, DEFAULT_BUILD_PATH, targetName);
    const label = pPath ? pPath : targetName;
    return {baseDir, label};
}

// Appends debug and project context files if they're applicable.
async function addOptionalFiles(files: FileInfo[], pPath: string | null) {
    if (pPath) {
        const projectMdPath = join(pPath, '.junie', 'PROJECT.md');
        if (await Bun.file(projectMdPath).exists()) {
            files = [...files];
            files.push({
                type: 'project',
                path: projectMdPath
            });
        }
    }
    return files;
}

// Automates the generation and logging of the merged AGENTS.md.
async function generateAgentsMd(targetName: string, files: FileInfo[], pPath: string | null) {
    const localFiles = await addOptionalFiles(files, pPath);

    const {baseDir, label} = getTargetInfo(targetName, pPath);
    const outDir = join(baseDir, '.junie');

    if (!(await exists(outDir))) mkdirSync(outDir, {recursive: true});

    await Bun.write(join(outDir, 'AGENTS.md'), await merge(localFiles));
    console.log(`✓ ${label}/.junie/AGENTS.md (model: ${model}${debug ? ', debug' : ''}, ${localFiles.length} sources)`);
}

// Main Build Routines
async function buildPlugin() {
    const files: FileInfo[] = [
        {type: 'base', path: join(src, 'base.md')},
        {type: 'base', path: join(src, 'confidentiality.md'), disable: debug},
        {type: 'workflow', entry: true, path: join(src, '01_core', 'workflow.md')},
        {type: 'rule-begin'},
        ...sharedRuleFiles(),
        ...(await platformRuleFiles('junie_plugin')),
        {type: 'rule-end'},
        modelFile,
    ];

    // Skills intro + inlined skills
    files.push({type: 'skill-intro', path: join(src, 'junie_plugin', 'skills-intro.md')});
    files.push(...await getSkillFiles('02_skills'));
    files.push(...await getSkillFiles(join('junie_plugin', 'skills')));
    files.push({type: 'skill-end'});

    files.push({type: 'guardrail', path: join(src, '04_guardrails', 'mandatory-checks.md')});
    if (debug) files.push({type: 'guardrail', path: join(src, '04_guardrails', 'debug-header.md')});

    if (projectPaths.length > 0) {
        for (const pPath of projectPaths) {
            await generateAgentsMd('plugin', files, pPath);
        }
    } else {
        await generateAgentsMd('plugin', files, null);
    }
}

async function buildAcp() {
    const files: FileInfo[] = [
        {type: 'base', path: join(src, 'base.md')},
        {type: 'base', path: join(src, 'confidentiality.md'), disable: debug},
        {type: 'workflow', entry: true, path: join(src, '01_core', 'workflow.md')},
        modelFile,
    ];

    const runAcpForProject = async (pPath: string | null) => {
        await generateAgentsMd('acp', files, pPath);

        const {baseDir, label} = getTargetInfo('acp', pPath);

        // shared rules + ACP rules → .aiassistant/rules/
        const aiRulesDir = join(baseDir, '.aiassistant', 'rules');
        if (await exists(aiRulesDir)) rmSync(aiRulesDir, {recursive: true});
        mkdirSync(aiRulesDir, {recursive: true});

        const ruleFiles = sharedRuleFiles();
        ruleFiles.push(...await platformRuleFiles('junie_acp'));

        ruleFiles.push({type: 'guardrail', path: join(src, '04_guardrails', 'mandatory-checks.md')});
        if (debug) ruleFiles.push({type: 'guardrail', path: join(src, '04_guardrails', 'debug-header.md')});

        for (const info of ruleFiles) cpSync(info.path!, join(aiRulesDir, basename(info.path!)));

        console.log(`  Rules: ${ruleFiles.length} files → ${label}/.aiassistant/rules/`);

        // shared skills only → .agents/skills/
        const agentSkillsDir = join(baseDir, '.agents', 'skills');

        const skillFolders = await getSkillFolder('02_skills');
        skillFolders.push(...await getSkillFolder(join('junie_acp', 'skills')));

        for (let skillFolder of skillFolders) {
            if (await exists(skillFolder)) {
                if (await exists(agentSkillsDir)) rmSync(agentSkillsDir, {recursive: true});
                // mkdirSync(agentSkillsDir, { recursive: true });
                cpSync(skillFolder, agentSkillsDir, {recursive: true});
            }
        }
        console.log(`  Skills: ${skillFolders.length} skill(s) → ${label}/.agents/skills/`);
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