import type { DocSection } from '../types'

/** Desktop type scale: `--uds-font-size-*` + `--uds-line-*` (see `uds-tokens.css`). */
const UDS_TYPE_SCALE = [
  { size: 128, line: 136 },
  { size: 96, line: 104 },
  { size: 72, line: 80 },
  { size: 60, line: 68 },
  { size: 48, line: 56 },
  { size: 36, line: 44 },
  { size: 32, line: 40 },
  { size: 28, line: 36 },
  { size: 24, line: 32 },
  { size: 20, line: 28 },
  { size: 16, line: 24 },
  { size: 18, line: 26 },
  { size: 14, line: 20 },
  { size: 12, line: 16 },
  { size: 10, line: 14 },
] as const

/** Static class map so Tailwind can see every `text-uds-*` utility. */
const TEXT_UDS_CLASS: Record<(typeof UDS_TYPE_SCALE)[number]['size'], string> = {
  128: 'text-uds-128',
  96: 'text-uds-96',
  72: 'text-uds-72',
  60: 'text-uds-60',
  48: 'text-uds-48',
  36: 'text-uds-36',
  32: 'text-uds-32',
  28: 'text-uds-28',
  24: 'text-uds-24',
  20: 'text-uds-20',
  16: 'text-uds-16',
  18: 'text-uds-18',
  14: 'text-uds-14',
  12: 'text-uds-12',
  10: 'text-uds-10',
}

const SAMPLE = 'The quick brown fox jumps over the lazy dog.'

const FONT_WEIGHTS = [
  { token: '--uds-font-weight', value: 400, utility: 'font-uds-regular' as const },
  { token: '--uds-font-weight-medium', value: 500, utility: 'font-uds-medium' as const },
  { token: '--uds-font-weight-semibold', value: 600, utility: 'font-uds-semibold' as const },
  { token: '--uds-font-weight-bold', value: 700, utility: 'font-uds-bold' as const },
] as const

function TypeScalePreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Primitive size and line-height tokens. Values below are desktop defaults; display sizes also scale at
        tablet and mobile breakpoints in{' '}
        <span className="font-mono text-xs">uds-tokens.css</span>.
      </p>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="w-full min-w-[min(100%,520px)] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/50">
              <th className="px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Tokens</th>
              <th className="min-w-[12rem] px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Preview</th>
              <th className="whitespace-nowrap px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Size</th>
              <th className="whitespace-nowrap px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">
                Line height
              </th>
              <th className="px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Utility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {UDS_TYPE_SCALE.map(({ size, line }) => (
              <tr key={size} className="align-top">
                <td className="space-y-1 px-3 py-3 font-mono text-[11px] leading-snug text-neutral-600 dark:text-neutral-400">
                  <div>--uds-font-size-{size}</div>
                  <div className="text-neutral-500 dark:text-neutral-500">--uds-line-{size}</div>
                </td>
                <td className="px-3 py-3 text-neutral-900 dark:text-neutral-100">
                  <p className={`font-sans ${TEXT_UDS_CLASS[size]}`}>{SAMPLE}</p>
                </td>
                <td className="whitespace-nowrap px-3 py-3 tabular-nums text-neutral-600 dark:text-neutral-400">
                  {size}px
                </td>
                <td className="whitespace-nowrap px-3 py-3 tabular-nums text-neutral-600 dark:text-neutral-400">
                  {line}px
                </td>
                <td className="px-3 py-3 font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                  {TEXT_UDS_CLASS[size]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FontWeightsPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Weight tokens for heading, label, and body styles. Use the matching{' '}
        <span className="font-mono text-xs">font-uds-*</span> utilities below, or inline{' '}
        <span className="font-mono text-xs">fontWeight: var(--uds-font-weight-semibold)</span>.
      </p>
      <div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-700">
        <table className="w-full min-w-[min(100%,360px)] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/50">
              <th className="px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Token</th>
              <th className="px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Utility</th>
              <th className="px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Value</th>
              <th className="min-w-[8rem] px-3 py-2 font-medium text-neutral-900 dark:text-neutral-100">Sample</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
            {FONT_WEIGHTS.map(({ token, value, utility }) => (
              <tr key={token}>
                <td className="px-3 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{token}</td>
                <td className="px-3 py-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">{utility}</td>
                <td className="px-3 py-3 tabular-nums text-neutral-600 dark:text-neutral-400">{value}</td>
                <td className={`px-3 py-3 font-sans text-uds-16 text-neutral-900 dark:text-neutral-100 ${utility}`}>
                  {SAMPLE}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const typeScaleExampleCode = `{/* Type scale — Tailwind utilities (see uds-typography-theme.css) */}
<p className="font-sans text-uds-16 font-uds-regular">
  Body
</p>

{/* Same values as CSS variables */}
<p
  style={{
    fontFamily: 'var(--uds-font-family)',
    fontSize: 'var(--uds-font-size-16)',
    lineHeight: 'var(--uds-line-16)',
  }}
>
  Body
</p>`

const fontWeightsExampleCode = `{/* Weight utilities */}
<span className="font-uds-semibold">Semibold label</span>

{/* Token in inline style */}
<span style={{ fontWeight: 'var(--uds-font-weight-semibold)' }}>Semibold label</span>`

function UtilitiesPreview() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Registered in <span className="font-mono text-xs">src/styles/uds-typography-theme.css</span> via{' '}
        <span className="font-mono text-xs">@theme</span>. Use <span className="font-mono text-xs">font-sans</span> for
        the Inter UI stack; use <span className="font-mono text-xs">font-uds</span> when you need the explicit{' '}
        <span className="font-mono text-xs">--uds-font-family</span> token. In React, the{' '}
        <span className="font-mono text-xs">Text</span> component groups these styles as{' '}
        <span className="font-mono text-xs">body</span>, <span className="font-mono text-xs">heading</span>, and{' '}
        <span className="font-mono text-xs">display</span> with matching <span className="font-mono text-xs">size</span>{' '}
        steps from <span className="font-mono text-xs">--uds-type-*</span>.
      </p>
      <ul className="list-inside list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
        <li>
          <span className="font-mono text-xs">text-uds-10</span> … <span className="font-mono text-xs">text-uds-128</span>{' '}
          — font size and paired line height
        </li>
        <li>
          <span className="font-mono text-xs">leading-uds-10</span> … <span className="font-mono text-xs">leading-uds-128</span>{' '}
          — line height only (e.g. with a different <span className="font-mono text-xs">text-*</span>)
        </li>
        <li>
          <span className="font-mono text-xs">font-uds-regular | font-uds-medium | font-uds-semibold | font-uds-bold</span>
        </li>
        <li>
          <span className="font-mono text-xs">font-uds</span> — family from <span className="font-mono text-xs">--uds-font-family</span>
        </li>
      </ul>
      <p className="font-sans text-sm leading-uds-16 text-neutral-600 dark:text-neutral-400">
        Example: <span className="font-mono text-xs">text-sm leading-uds-16</span> applies the 16px step line height
        while keeping a smaller font size.
      </p>
      {/* Literal class list so Tailwind emits every leading-uds-* + font-uds utility */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 -z-50 h-px w-px overflow-hidden opacity-0 font-uds leading-uds-128 leading-uds-96 leading-uds-72 leading-uds-60 leading-uds-48 leading-uds-36 leading-uds-32 leading-uds-28 leading-uds-24 leading-uds-20 leading-uds-18 leading-uds-16 leading-uds-15 leading-uds-14 leading-uds-12 leading-uds-10"
      />
    </div>
  )
}

const utilitiesExampleCode = `{/* Typical body + label */}
<p className="font-sans text-uds-16 font-uds-regular">Paragraph</p>
<p className="font-sans text-uds-14 font-uds-semibold">Label</p>

{/* Line height without changing the type scale size */}
<p className="font-sans text-sm leading-uds-20">Custom pairing</p>`

function sec(
  id: string,
  title: string,
  code: string,
  preview: DocSection['preview'],
  description?: string,
): DocSection {
  return { id, title, code, preview, description }
}

export function getTypographyFoundationSections(): DocSection[] {
  return [
    sec(
      'type-scale',
      'Type scale',
      typeScaleExampleCode,
      <TypeScalePreview />,
      'Fourteen steps from `--uds-font-size-10` through `--uds-font-size-128`, each paired with a matching `--uds-line-*` token.',
    ),
    sec(
      'font-weights',
      'Font weights',
      fontWeightsExampleCode,
      <FontWeightsPreview />,
      'Base, medium, semibold, and bold weights exposed as CSS variables.',
    ),
    sec(
      'tailwind-utilities',
      'Tailwind utilities',
      utilitiesExampleCode,
      <UtilitiesPreview />,
      'Theme keys live in `uds-typography-theme.css`; `text-uds-*` sets size and default line height together.',
    ),
  ]
}
