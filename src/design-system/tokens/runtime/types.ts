export type CssVarName = `--${string}`;
export type CssVarValue = string;
export type CssVarMap = Record<CssVarName, CssVarValue>;

export interface TokenCategory {
  readonly cssVars: CssVarMap;
  readonly darkCssVars?: CssVarMap;
}

export interface TypographyCategory extends TokenCategory {
  readonly media?: ReadonlyArray<{
    readonly query: string;
    readonly cssVars: CssVarMap;
  }>;
}

export interface RuntimeTokens {
  readonly color: TokenCategory;
  readonly spacing: TokenCategory;
  readonly radius: TokenCategory;
  readonly typography: TypographyCategory;
  readonly shadow: TokenCategory;
  readonly motion: TokenCategory;
}
