import type {
  ColorMode,
  CssVarMap,
  ModeDefinition,
  ResolvedTheme,
  ThemeDefinition,
  ThemeEngine,
} from "./theme.types";

const defaultModes: Record<ColorMode, ModeDefinition> = {
  light: { name: "light", className: "theme-light" },
  dark: { name: "dark", className: "theme-dark" },
};

const mergeVars = (...maps: Array<CssVarMap | undefined>): CssVarMap => {
  const merged: Record<string, string> = {};
  for (const map of maps) {
    if (!map) continue;
    Object.assign(merged, map);
  }
  return merged as CssVarMap;
};

export function createTheme<BrandName extends string>(
  definition: ThemeDefinition<BrandName>
): ThemeEngine<BrandName> {
  const modes: Record<ColorMode, ModeDefinition> = {
    ...defaultModes,
    ...(definition.modes ?? {}),
  };

  const resolve: ThemeEngine<BrandName>["resolve"] = (input) => {
    const brand = input?.brand ?? definition.defaultBrand;
    const mode = input?.mode ?? definition.defaultMode ?? "light";
    const brandDef = definition.brands[brand];
    const modeDef = modes[mode];

    const cssVars = mergeVars(
      definition.baseTokens,
      brandDef?.tokens,
      modeDef?.tokens,
      brandDef?.modeTokens?.[mode],
      input?.overrides
    );

    return {
      brand,
      mode,
      classNames: {
        brand: brandDef?.className ?? `brand-${brand}`,
        mode: modeDef?.className ?? `theme-${mode}`,
      },
      cssVars,
    } satisfies ResolvedTheme<BrandName>;
  };

  const applyToElement: ThemeEngine<BrandName>["applyToElement"] = (element, theme) => {
    const allBrandClasses = Object.values(definition.brands).map((b) => b.className);
    const allModeClasses = Object.values(modes).map((m) => m.className);

    element.classList.remove(...allBrandClasses, ...allModeClasses);
    element.classList.add(theme.classNames.brand, theme.classNames.mode);

    const style = element.style;
    for (const [name, value] of Object.entries(theme.cssVars)) {
      style.setProperty(name, value);
    }
    element.dataset.brand = theme.brand;
    element.dataset.theme = theme.mode;
  };

  return {
    definition: {
      ...definition,
      modes,
    },
    resolve,
    applyToElement,
  };
}
