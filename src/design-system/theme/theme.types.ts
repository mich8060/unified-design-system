export type CssVarName = `--${string}`;
export type CssVarMap = Readonly<Record<CssVarName, string>>;

export type ColorMode = "light" | "dark";

export interface BrandDefinition<BrandName extends string = string> {
  name: BrandName;
  className: string;
  tokens?: CssVarMap;
  modeTokens?: Partial<Record<ColorMode, CssVarMap>>;
}

export interface ModeDefinition {
  name: ColorMode;
  className: string;
  tokens?: CssVarMap;
}

export interface ThemeDefinition<BrandName extends string = string> {
  baseTokens?: CssVarMap;
  brands: Record<BrandName, BrandDefinition<BrandName>>;
  modes?: Partial<Record<ColorMode, ModeDefinition>>;
  defaultBrand: BrandName;
  defaultMode?: ColorMode;
}

export interface ResolvedTheme<BrandName extends string = string> {
  brand: BrandName;
  mode: ColorMode;
  classNames: {
    brand: string;
    mode: string;
  };
  cssVars: CssVarMap;
}

export interface ThemeEngine<BrandName extends string = string> {
  readonly definition: ThemeDefinition<BrandName>;
  resolve(input?: { brand?: BrandName; mode?: ColorMode; overrides?: CssVarMap }): ResolvedTheme<BrandName>;
  applyToElement(element: HTMLElement, theme: ResolvedTheme<BrandName>): void;
}

export interface ThemeController<BrandName extends string = string> {
  getSnapshot(): ResolvedTheme<BrandName>;
  subscribe(listener: () => void): () => void;
  setBrand(brand: BrandName): void;
  setMode(mode: ColorMode): void;
  setTheme(next: { brand?: BrandName; mode?: ColorMode }): void;
  setTarget(element: HTMLElement | null): void;
}
