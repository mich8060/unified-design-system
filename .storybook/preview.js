import "../src/styles/index.scss";

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  globalTypes: {
    brand: {
      name: "Brand",
      description: "Active UDS brand token set",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "default", title: "Default" },
          { value: "comphealth", title: "CompHealth" },
          { value: "weatherby", title: "Weatherby" },
          { value: "connect", title: "Connect" },
          { value: "locumsmart", title: "LocumSmart" },
          { value: "modio", title: "Modio" },
          { value: "gms", title: "GMS" },
          { value: "chg", title: "CHG" },
          { value: "wireframe", title: "Wireframe" },
        ],
      },
    },
    theme: {
      name: "Theme",
      description: "Active light/dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      const brand = context.globals.brand || "default";
      const theme = context.globals.theme || "light";

      const brandClassNames = [
        "brand-default",
        "brand-comphealth",
        "brand-weatherby",
        "brand-connect",
        "brand-locumsmart",
        "brand-modio",
        "brand-gms",
        "brand-chg",
        "brand-wireframe",
      ];
      const themeClassNames = ["theme-light", "theme-dark"];

      root.classList.remove(...brandClassNames, ...themeClassNames);
      root.classList.add(`brand-${brand}`, `theme-${theme}`);
      root.setAttribute("data-brand", brand === "default" ? "design-system" : brand);
      root.setAttribute("data-mode", theme);

      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
