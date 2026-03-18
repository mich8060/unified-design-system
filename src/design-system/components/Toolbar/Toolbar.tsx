import { Layout } from "../Layout";
import "./_toolbar.scss";
import type { ToolbarProps } from "./Toolbar.types";

export function Toolbar({
  left,
  center,
  right,
  className = "",
  ...rest
}: ToolbarProps) {
  const classNames = ["uds-toolbar", className].filter(Boolean).join(" ");

  return (
    <div className={classNames} role="toolbar" {...rest}>
      <Layout className="uds-toolbar__left" alignItems="center" gap="8">
        {left}
      </Layout>
      <div className="uds-toolbar__center">{center}</div>
      <Layout className="uds-toolbar__right" alignItems="center" gap="8">
        {right}
      </Layout>
    </div>
  );
}
