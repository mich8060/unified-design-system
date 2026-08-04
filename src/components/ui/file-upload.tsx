"use client"

import * as React from "react"
import { UploadSimpleIcon } from "@phosphor-icons/react/UploadSimple"
import { Medallion, type MedallionSize } from "@/components/ui/medallion"
import { cn } from "@/lib/utils"

export type FileUploadSize = "default" | "small" | "xs"

export type FileUploadProps = Omit<React.ComponentProps<"div">, "onDrop"> & {
  onFileSelect?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  disabled?: boolean
  size?: FileUploadSize
  title?: React.ReactNode
  desc?: React.ReactNode
  descClassName?: string
}

function medallionSizeForUpload(size: FileUploadSize): MedallionSize {
  if (size === "xs") return "xs"
  if (size === "small") return "sm"
  return "xl"
}

function FileUpload({
  className,
  onFileSelect,
  accept,
  multiple = false,
  disabled = false,
  size = "default",
  title,
  desc,
  descClassName,
  onClick,
  onKeyDown,
  ...props
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const resolvedTitle =
    title ??
    (size === "small"
      ? multiple
        ? "Drop files or click to upload"
        : "Drop file or click to upload"
      : multiple
        ? "Drop files here or click to upload"
        : "Drop file here or click to upload")

  const resolvedDesc = desc ?? "All files up to 10MB"

  /** XS: Title + Separator + Desc on one row when both copy values are plain strings. */
  const xsInlineRow =
    size === "xs" &&
    typeof resolvedTitle === "string" &&
    typeof resolvedDesc === "string"

  const emitFiles = React.useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return
      const files = Array.from(fileList)
      onFileSelect?.(files)
    },
    [onFileSelect]
  )

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      data-slot="file-upload"
      data-size={size}
      data-state={disabled ? "disabled" : isDragging ? "dragging" : "default"}
      className={cn(
        "group/file-upload flex w-full cursor-pointer flex-col items-center justify-center rounded-[length:var(--uds-radius-8)] border border-dashed border-[var(--uds-border-primary)] bg-[var(--uds-surface-secondary)] p-6 text-center outline-none transition-colors",
        /* xs: always 8px corners (token can be 0 under wireframe / flat themes). */
        "data-[size=xs]:rounded-[8px]",
        "data-[size=default]:gap-2 data-[size=small]:gap-1",
        "data-[size=xs]:flex-row data-[size=xs]:items-center data-[size=xs]:justify-start data-[size=xs]:gap-2 data-[size=xs]:text-left",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2",
        "data-[size=xs]:px-3 data-[size=xs]:py-3 data-[size=xs]:focus-visible:ring-offset-1",
        "hover:border-[var(--uds-border-secondary)] hover:bg-[var(--uds-surface-tertiary)]",
        "data-[size=default]:min-h-[168px] data-[size=small]:min-h-32 data-[size=xs]:min-h-12",
        isDragging &&
          "border-[var(--uds-border-secondary)] bg-[var(--uds-surface-tertiary)]",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onDragEnter={(event) => {
        event.preventDefault()
        if (!disabled) setIsDragging(true)
      }}
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDragLeave={(event) => {
        event.preventDefault()
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
          return
        }
        setIsDragging(false)
      }}
      onDrop={(event) => {
        event.preventDefault()
        setIsDragging(false)
        if (disabled) return
        emitFiles(event.dataTransfer.files)
      }}
      onClick={(event) => {
        if (!disabled) {
          inputRef.current?.click()
        }
        onClick?.(event)
      }}
      onKeyDown={(event) => {
        if (!disabled && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault()
          inputRef.current?.click()
        }
        onKeyDown?.(event)
      }}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => {
          emitFiles(event.currentTarget.files)
          event.currentTarget.value = ""
        }}
      />
      <Medallion
        color="blue"
        tone="solid"
        shape="circle"
        size={medallionSizeForUpload(size)}
        icon={<UploadSimpleIcon aria-hidden weight="bold" />}
        className="shrink-0"
      />
      {xsInlineRow ? (
        <div
          data-slot="file-upload-copy"
          className="flex min-w-0 flex-1 flex-row items-center gap-1 truncate whitespace-nowrap text-uds-14 leading-uds-14"
        >
          <span
            data-slot="file-upload-title"
            className="shrink-0 font-uds-semibold text-[var(--uds-text-primary)]"
          >
            {resolvedTitle}
          </span>
          <span
            data-slot="file-upload-separator"
            className="shrink-0 font-uds-regular text-[var(--uds-text-secondary)]"
            aria-hidden
          >
            -
          </span>
          <span
            data-slot="file-upload-desc"
            className={cn(
              "min-w-0 truncate font-uds-regular text-[var(--uds-text-secondary)]",
              descClassName,
            )}
          >
            {resolvedDesc}
          </span>
        </div>
      ) : (
        <div
          data-slot="file-upload-copy"
          className={cn(
            "flex min-w-0 flex-col gap-1",
            size === "xs"
              ? "flex-1 items-start justify-center text-left"
              : "w-full items-center text-center"
          )}
        >
          <p
            data-slot={size === "xs" ? "file-upload-title" : "file-upload-instruction"}
            className={cn(
              "font-sans font-uds-medium text-[var(--uds-text-primary)]",
              "text-uds-16 leading-uds-16 group-data-[size=small]/file-upload:font-uds-semibold",
              "group-data-[size=xs]/file-upload:text-uds-14 group-data-[size=xs]/file-upload:font-uds-semibold group-data-[size=xs]/file-upload:leading-uds-14",
            )}
          >
            {resolvedTitle}
          </p>
          <p
            data-slot={size === "xs" ? "file-upload-desc" : "file-upload-helper"}
            className={cn(
              "font-sans font-uds-regular text-[var(--uds-text-secondary)]",
              "text-uds-14 leading-uds-14 group-data-[size=small]/file-upload:text-uds-12 group-data-[size=small]/file-upload:leading-uds-12",
              "group-data-[size=xs]/file-upload:text-uds-14 group-data-[size=xs]/file-upload:leading-uds-14",
              descClassName,
            )}
          >
            {resolvedDesc}
          </p>
        </div>
      )}
    </div>
  )
}

export { FileUpload }
