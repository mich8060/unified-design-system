import type { BrandingAppearance } from '@/components/ui/branding'

/** Values that match `[data-brand=…]` selectors in shipped `styles.css`. */
export const UDS_BRAND_IDS = [
  'default',
  'comphealth',
  'weatherby',
  'connect',
  'locumsmart',
  'wireframe',
  'modio',
  'gms',
  'chg',
] as const

export type UdsBrandId = (typeof UDS_BRAND_IDS)[number]

/** Default brand for published `Menu` / consumer apps (CHG Healthcare product shell). */
export const UDS_DEFAULT_BRAND: UdsBrandId = 'chg'

/** Optional consumer persistence when `Menu` `brandStorageKey` is set. */
export const UDS_BRAND_STORAGE_KEY = 'uds-brand'

export const UDS_BRAND_OPTIONS: { value: UdsBrandId; label: string }[] = [
  { value: 'default', label: 'Default' },
  { value: 'comphealth', label: 'CompHealth' },
  { value: 'weatherby', label: 'Weatherby' },
  { value: 'connect', label: 'Connect' },
  { value: 'locumsmart', label: 'Locumsmart' },
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'modio', label: 'Modio' },
  { value: 'gms', label: 'GMS' },
  { value: 'chg', label: 'CHG' },
]

export function isUdsBrandId(value: string): value is UdsBrandId {
  return (UDS_BRAND_IDS as readonly string[]).includes(value)
}

export function readBrandFromStorage(storageKey: string, fallback: UdsBrandId): UdsBrandId {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(storageKey)
    if (raw && isUdsBrandId(raw)) return raw
  } catch {
    // private mode / denied
  }
  return fallback
}

export function persistBrandToStorage(storageKey: string, id: UdsBrandId) {
  try {
    window.localStorage.setItem(storageKey, id)
  } catch {
    // ignore
  }
}

export function applyUdsBrandToDocument(id: UdsBrandId) {
  document.documentElement.dataset.brand = id
}

/** Maps CSS token brand to the nearest `Branding` SVG row. */
export function udsBrandToBrandingAppearance(id: UdsBrandId): BrandingAppearance {
  const map = {
    default: 'Design System',
    comphealth: 'MyCompHealth',
    weatherby: 'MyWeatherby',
    connect: 'Connect',
    locumsmart: 'Locumsmart',
    wireframe: 'Wireframe',
    modio: 'Modio',
    gms: 'Design System',
    chg: 'CHG',
  } as const satisfies Record<UdsBrandId, BrandingAppearance>
  return map[id]
}

export function resolveMenuBrand(options: {
  brand?: UdsBrandId
  defaultBrand?: UdsBrandId
  brandStorageKey?: string
}): UdsBrandId {
  const fallback = options.defaultBrand ?? UDS_DEFAULT_BRAND
  if (options.brand != null) return options.brand
  if (options.brandStorageKey) return readBrandFromStorage(options.brandStorageKey, fallback)
  return fallback
}
