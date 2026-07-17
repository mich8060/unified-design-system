# Corner radius

Token scale: `--uds-radius-0` through `--uds-radius-12`, plus `--uds-radius-9999` for pills/circles.

## Policy (rectangles ≤ 12px)
- **Prefer 4px** for routine layout, form, and status chrome
- **8px** for overlays and menus that already ship at 8px
- **12px** max for decorative/media surfaces and selected primitives
- **`9999` / full** only for avatars, dots, pill toggles, medallions—not oversized rounded rectangles

Do not use Tailwind steps above 12px (`rounded-2xl`, etc.) on rectangular surfaces.

## See also

- ../decision-rules/choosing-radius.md
- ../anti-patterns/radius-mistakes.md
