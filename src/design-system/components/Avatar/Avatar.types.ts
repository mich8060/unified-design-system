import type { HTMLAttributes, MouseEvent } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
  name?: string;
  status?: boolean;
  size?: "small" | "default" | "large";
  showCameraButton?: boolean;
  cameraButtonAriaLabel?: string;
  onCameraClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  alt?: string;
}
