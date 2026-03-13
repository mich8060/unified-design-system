import { Medallion } from "./Medallion";

export const figmaNodeUrl = "https://www.figma.com/file/FILE_ID/Library?node-id=NODE_ID";

export default {
  figmaNodeUrl,
  component: Medallion,
  props: {
    icon: "FileText",
    shape: "circle",
    size: "default",
    color: "neutral",
  },
};
