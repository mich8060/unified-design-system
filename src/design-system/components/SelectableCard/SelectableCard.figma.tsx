import React from "react";
import { SelectableCard } from "./SelectableCard";

export const figmaNodeUrl = "https://www.figma.com/file/FILE_ID/Library?node-id=NODE_ID";

export default {
  figmaNodeUrl,
  component: SelectableCard,
  props: {
    children: ["SelectableCard"]
  }
};
