import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

/** Supported input sizes. */
export type TextInputSize = "default" | "compact";

/** Supported visual states. */
export type TextInputState = "default" | "focused" | "error" | "disabled";

/** Supported icon positions. */
export type TextInputIconPosition = "left" | "right";

/**
 * Public props for the UDS TextInput component.
 *
 * @example
 * ```tsx
 * <TextInput
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder="you@example.com"
 *   icon="Envelope"
 *   iconPosition="left"
 * />
 * ```
 */
export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  /** Current input value. */
  value?: string | number | readonly string[];
  /** Input change handler. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Input type. */
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  /** Size token. */
  size?: TextInputSize;
  /** Visual state token. */
  state?: TextInputState;
  /** Optional icon name or custom icon node. */
  icon?: string | ReactNode;
  /** Icon placement. */
  iconPosition?: TextInputIconPosition;
  /** Optional click handler for icon button mode. */
  onIconClick?: MouseEventHandler<HTMLButtonElement>;
  /** Optional visible label rendered with htmlFor/id linkage. */
  label?: ReactNode;
  /** Helper text rendered below the input. */
  helperText?: ReactNode;
  /** Error text rendered below the input when in error state. */
  errorText?: ReactNode;
}
