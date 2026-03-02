import type { BrandDefinition, ColorMode, CssVarMap } from "./theme.types";

export interface CreateBrandOptions {
  className?: string;
  tokens?: CssVarMap;
  modeTokens?: Partial<Record<ColorMode, CssVarMap>>;
}

export function createBrand<BrandName extends string>(
  name: BrandName,
  options: CreateBrandOptions = {}
): BrandDefinition<BrandName> {
  return {
    name,
    className: options.className ?? `brand-${name}`,
    tokens: options.tokens,
    modeTokens: options.modeTokens,
  };
}
