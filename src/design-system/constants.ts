import type { ButtonAppearance, ButtonLayout, ButtonSize } from "./components/Button/Button.types";
import type { FlexAlignItems, FlexDirection, FlexGapToken, FlexJustifyContent, FlexWrap } from "./components/Flex/Flex.types";
import type { IconAppearance } from "./components/Icon/Icon.types";
import type { TextLeading, TextVariant, TextWeight } from "./components/Text/Text.types";
import type { TextInputIconPosition, TextInputSize, TextInputState } from "./components/TextInput/TextInput.types";
import type { MenuMode } from "./components/Menu/Menu.types";

/** Valid values for Button `appearance`. */
export const BUTTON_APPEARANCES: readonly ButtonAppearance[] = [
  "primary",
  "soft",
  "outline",
  "text",
  "ghost",
  "disabled",
  "destructive",
];

/** Valid values for Button `layout`. */
export const BUTTON_LAYOUTS: readonly ButtonLayout[] = [
  "label-only",
  "icon-left",
  "icon-right",
  "icon-only",
  "only",
];

/** Valid values for Button `size`. */
export const BUTTON_SIZES: readonly ButtonSize[] = ["large", "default", "small", "xsmall"];

/** Valid values for Text `variant`. */
export const TEXT_VARIANTS: readonly TextVariant[] = [
  "display-128",
  "display-96",
  "display-72",
  "display-60",
  "display-48",
  "display-36",
  "heading-32",
  "heading-28",
  "heading-24",
  "body-20",
  "body-16",
  "body-14",
  "body-12",
];

/** Valid values for Text `weight`. */
export const TEXT_WEIGHTS: readonly TextWeight[] = ["regular", "medium", "semibold", "bold"];

/** Valid values for Text `leading`. */
export const TEXT_LEADINGS: readonly TextLeading[] = ["tight", "regular", "loose"];

/** Valid values for Flex `direction`. */
export const FLEX_DIRECTIONS: readonly FlexDirection[] = ["row", "column"];

/** Valid values for Flex `justifyContent`. */
export const FLEX_JUSTIFY_CONTENT: readonly FlexJustifyContent[] = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];

/** Valid values for Flex `alignItems`. */
export const FLEX_ALIGN_ITEMS: readonly FlexAlignItems[] = [
  "stretch",
  "flex-start",
  "center",
  "flex-end",
  "baseline",
];

/** Valid values for Flex `wrap`. */
export const FLEX_WRAP_VALUES: readonly FlexWrap[] = ["nowrap", "wrap", "wrap-reverse"];

/** Valid values for Flex tokenized gap presets. */
export const FLEX_GAP_TOKENS: readonly FlexGapToken[] = ["0", "2", "4", "8", "12", "16", "24", "32"];

/** Valid values for TextInput `size`. */
export const TEXT_INPUT_SIZES: readonly TextInputSize[] = ["default", "compact"];

/** Valid values for TextInput `state`. */
export const TEXT_INPUT_STATES: readonly TextInputState[] = ["default", "focused", "error", "disabled"];

/** Valid values for TextInput `iconPosition`. */
export const TEXT_INPUT_ICON_POSITIONS: readonly TextInputIconPosition[] = ["left", "right"];

/** Valid values for Icon `appearance`. */
export const ICON_APPEARANCES: readonly IconAppearance[] = [
  "regular",
  "bold",
  "thin",
  "light",
  "duotone",
  "fill",
  "solid",
  "outline",
];

/** Valid values for Menu and AppShell `theme` / mode controls. */
export const MENU_MODES: readonly MenuMode[] = ["light", "dark"];
