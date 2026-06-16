import { createBundledHighlighter, createSingletonShorthands } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

/** Languages used by docs CodePanel — fine-grained imports avoid shiki/bundle/web (~600KB+ langs). */
const bundledLangs = {
  tsx: () => import('@shikijs/langs/tsx'),
  typescript: () => import('@shikijs/langs/typescript'),
  jsx: () => import('@shikijs/langs/jsx'),
  javascript: () => import('@shikijs/langs/javascript'),
  css: () => import('@shikijs/langs/css'),
  scss: () => import('@shikijs/langs/scss'),
  html: () => import('@shikijs/langs/html'),
  json: () => import('@shikijs/langs/json'),
  bash: () => import('@shikijs/langs/bash'),
  shell: () => import('@shikijs/langs/shell'),
  markdown: () => import('@shikijs/langs/markdown'),
  md: () => import('@shikijs/langs/md'),
  yaml: () => import('@shikijs/langs/yaml'),
} as const

const bundledThemes = {
  'github-dark': () => import('@shikijs/themes/github-dark'),
} as const

export type DocsCodeLanguage = keyof typeof bundledLangs

const createHighlighter = createBundledHighlighter({
  langs: bundledLangs,
  themes: bundledThemes,
  engine: createJavaScriptRegexEngine,
})

export const { getSingletonHighlighter } = createSingletonShorthands(createHighlighter)

export const DOCS_HIGHLIGHTER_LANGS: DocsCodeLanguage[] = [
  'tsx',
  'typescript',
  'jsx',
  'javascript',
  'css',
  'scss',
  'html',
  'json',
  'bash',
  'shell',
  'markdown',
  'md',
  'yaml',
]
