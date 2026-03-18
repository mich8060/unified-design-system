import React from "react";
import { DescriptionList } from "./DescriptionList";

export const figmaNodeUrl = "https://www.figma.com/file/FILE_ID/Library?node-id=NODE_ID";

export default {
  figmaNodeUrl,
  component: DescriptionList,
  props: {
    children: ["DescriptionList"]
  }
};
