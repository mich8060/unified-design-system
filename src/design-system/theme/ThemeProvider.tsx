import React, { createContext, useContext, useMemo, useRef, useSyncExternalStore } from "react";
import type { ColorMode, ResolvedTheme, ThemeController, ThemeEngine } from "./theme.types";

class ThemeStore<BrandName extends string> implements ThemeController<BrandName> {
  private listeners = new Set<() => void>();
  private target: HTMLElement | null;
  private snapshot: ResolvedTheme<BrandName>;

  constructor(
    private engine: ThemeEngine<BrandName>,
    initial: ResolvedTheme<BrandName>,
    target: HTMLElement | null
  ) {
    this.snapshot = initial;
    this.target = target;
    if (this.target) {
      this.engine.applyToElement(this.target, this.snapshot);
    }
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  private commit(next: ResolvedTheme<BrandName>) {
    this.snapshot = next;
    if (this.target) {
      this.engine.applyToElement(this.target, this.snapshot);
    }
    this.notify();
  }

  getSnapshot(): ResolvedTheme<BrandName> {
    return this.snapshot;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  setBrand(brand: BrandName) {
    this.commit(this.engine.resolve({ brand, mode: this.snapshot.mode }));
  }

  setMode(mode: ColorMode) {
    this.commit(this.engine.resolve({ brand: this.snapshot.brand, mode }));
  }

  setTheme(next: { brand?: BrandName; mode?: ColorMode }) {
    this.commit(
      this.engine.resolve({
        brand: next.brand ?? this.snapshot.brand,
        mode: next.mode ?? this.snapshot.mode,
      })
    );
  }

  setTarget(element: HTMLElement | null) {
    this.target = element;
    if (this.target) {
      this.engine.applyToElement(this.target, this.snapshot);
    }
  }
}

interface ThemeProviderProps<BrandName extends string> {
  theme: ThemeEngine<BrandName>;
  initialBrand?: BrandName;
  initialMode?: ColorMode;
  target?: HTMLElement | null;
  children: React.ReactNode;
}

type ThemeControllerContext = ThemeController<string> | null;
const ThemeContext = createContext<ThemeControllerContext>(null);

export function ThemeProvider<BrandName extends string>({
  theme,
  initialBrand,
  initialMode,
  target = typeof document !== "undefined" ? document.documentElement : null,
  children,
}: ThemeProviderProps<BrandName>) {
  const storeRef = useRef<ThemeStore<BrandName> | null>(null);

  if (!storeRef.current) {
    const initial = theme.resolve({
      brand: initialBrand,
      mode: initialMode,
    });
    storeRef.current = new ThemeStore(theme, initial, target);
  } else if (target !== undefined) {
    storeRef.current.setTarget(target);
  }

  const contextValue = useMemo(() => storeRef.current as ThemeController<string>, []);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useThemeController<BrandName extends string = string>(): ThemeController<BrandName> {
  const controller = useContext(ThemeContext) as ThemeController<BrandName> | null;
  if (!controller) {
    throw new Error("useThemeController must be used within a ThemeProvider.");
  }
  return controller;
}

export function useTheme<BrandName extends string = string>(): ResolvedTheme<BrandName> {
  const controller = useThemeController<BrandName>();
  return useSyncExternalStore(
    controller.subscribe.bind(controller),
    controller.getSnapshot.bind(controller),
    controller.getSnapshot.bind(controller)
  );
}
