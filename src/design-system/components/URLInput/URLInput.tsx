import { TextInput } from "../TextInput";
import type { URLInputProps } from "./URLInput.types";

export function URLInput(props: URLInputProps) {
  return (
    <TextInput
      type="url"
      inputMode="url"
      placeholder={props.placeholder ?? "https://"}
      {...props}
    />
  );
}

export default URLInput;
