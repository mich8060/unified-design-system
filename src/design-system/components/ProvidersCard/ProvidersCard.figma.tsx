import React from "react";
import { ProvidersCard } from "./ProvidersCard";

export const figmaNodeUrl = "https://www.figma.com/file/FILE_ID/Library?node-id=NODE_ID";

export default {
  figmaNodeUrl,
  component: ProvidersCard,
  props: {
    children: ["ProvidersCard"]
  }
};
