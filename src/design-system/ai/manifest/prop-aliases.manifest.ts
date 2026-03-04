export interface PropAliasManifest {
  global: Record<string, string>;
  byComponent: Record<string, Record<string, string>>;
}

export const PropAliasRules: PropAliasManifest = {
  global: {},
  byComponent: {
    Chip: {
      iconplacement: "iconPlacement",
    },
  },
};

export function getCanonicalPropName(componentName: string, propName: string): string {
  const componentRules = PropAliasRules.byComponent[componentName] ?? {};
  return componentRules[propName] ?? PropAliasRules.global[propName] ?? propName;
}

export function getAliasEntries(componentName: string): Array<{ alias: string; canonical: string }> {
  const componentRules = PropAliasRules.byComponent[componentName] ?? {};
  const entries = Object.entries(componentRules).map(([alias, canonical]) => ({ alias, canonical }));
  return entries.sort((a, b) => a.alias.localeCompare(b.alias));
}

