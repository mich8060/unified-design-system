"use client"

import * as React from "react"
import {
  ArrowClockwiseIcon,
  DownloadSimpleIcon,
  EyeIcon,
  FileIcon,
  ImageIcon,
  XIcon,
} from "@phosphor-icons/react"

import { Badge } from "@/components/ui/badge"
import { FileUpload, type FileUploadProps, type FileUploadSize } from "@/components/ui/file-upload"
import { Medallion, type MedallionSize } from "@/components/ui/medallion"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

export type FileUploadCardStatus =
  | "idle"
  | "uploading"
  | "success"
  | "error"
  | "disabled"

export type FileUploadCardItem = {
  id: string
  name: string
  size?: number
  type?: string
  uploadedAt?: string
  previewUrl?: string
  status?: FileUploadCardStatus
  progress?: number
  errorMessage?: string
  file?: File
}

export type FileUploadCardsDensity = "default" | "compact"

export type FileUploadCardsProps = Omit<FileUploadProps, "onFileSelect"> & {
  files?: File[]
  defaultFiles?: File[]
  items?: FileUploadCardItem[]
  defaultItems?: FileUploadCardItem[]
  onFilesChange?: (files: File[]) => void
  onItemsChange?: (items: FileUploadCardItem[]) => void
  onRetry?: (item: FileUploadCardItem) => void
  onView?: (item: FileUploadCardItem) => void
  onDownload?: (item: FileUploadCardItem) => void
  /** Tighter card rows (smaller medallion, type scale, actions) and a compact dropzone when `size` is not set. */
  density?: FileUploadCardsDensity
}

function toCardItem(file: File): FileUploadCardItem {
  return {
    id: `${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    size: file.size,
    type: file.type,
    status: "idle",
    file,
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(1)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

function medallionSizeForCard(compact: boolean): MedallionSize {
  return compact ? "sm" : "default"
}

function medallionIconSize(compact: boolean): number {
  return compact ? 16 : 20
}

function getStatusConfig(status: FileUploadCardStatus) {
  switch (status) {
    case "uploading":
      return { label: "Uploading", accent: "sky" as const }
    case "success":
      return { label: "Uploaded", accent: "green" as const }
    case "error":
      return { label: "Error", accent: "red" as const }
    case "disabled":
      return { label: "Disabled", accent: "neutral" as const }
    case "idle":
    default:
      return { label: "Ready", accent: "neutral" as const }
  }
}

function FileUploadCards({
  files: _controlledFiles,
  defaultFiles = [],
  items,
  defaultItems = [],
  onFilesChange,
  onItemsChange,
  onRetry,
  onView,
  onDownload,
  desc = "PDF, DOCX, PNG up to 10MB each",
  multiple = true,
  density = "default",
  size,
  ...props
}: FileUploadCardsProps) {
  void _controlledFiles
  const compact = density === "compact"
  const dropzoneSize: FileUploadSize = size ?? (compact ? "xs" : "default")
  const medallionSize = medallionSizeForCard(compact)
  const iconPx = medallionIconSize(compact)

  const [internalItems, setInternalItems] = React.useState<FileUploadCardItem[]>(
    defaultItems.length > 0 ? defaultItems : defaultFiles.map(toCardItem)
  )
  const selectedItems = items ?? internalItems

  const setItems = (nextItems: FileUploadCardItem[]) => {
    if (items === undefined) {
      setInternalItems(nextItems)
    }
    onItemsChange?.(nextItems)

    const nextFiles = nextItems
      .map((item) => item.file)
      .filter((file): file is File => file instanceof File)
    onFilesChange?.(nextFiles)
  }

  return (
    <div
      data-slot="file-upload-cards"
      data-density={density}
      className={cn(compact ? "space-y-2" : "space-y-4")}
    >
      <FileUpload
        multiple={multiple}
        desc={desc}
        size={dropzoneSize}
        onFileSelect={(nextFiles) => {
          setItems([...selectedItems, ...nextFiles.map(toCardItem)])
        }}
        {...props}
      />
      {selectedItems.length > 0 ? (
        <div
          data-slot="file-upload-cards-list"
          className={cn("grid grid-cols-1", compact ? "gap-2" : "gap-3")}
        >
          {selectedItems.map((item, index) => {
            const status = item.status ?? "idle"
            const statusConfig = getStatusConfig(status)
            const isDisabled = status === "disabled"
            const canRemove = !isDisabled
            const metadata = [
              typeof item.size === "number" ? formatFileSize(item.size) : null,
              item.type || null,
              item.uploadedAt || null,
            ].filter(Boolean)

            const fileIcon =
              item.type?.startsWith("image/") ? (
                <ImageIcon aria-hidden size={iconPx} weight="regular" />
              ) : (
                <FileIcon aria-hidden size={iconPx} weight="regular" />
              )

            return (
              <div
                key={item.id || `${item.name}-${index}`}
                data-slot="file-upload-card"
                data-status={status}
                className={cn(
                  "rounded-[8px] border border-[var(--uds-border-primary)] bg-[var(--uds-surface-secondary)] p-3",
                  isDisabled && "opacity-60",
                )}
              >
                <div
                  data-slot="card-row"
                  className={cn(
                    "flex items-start",
                    compact ? "gap-2" : "gap-3",
                  )}
                >
                  {item.previewUrl ? (
                    <div
                      data-slot="medallion"
                      className={cn(
                        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--uds-surface-tertiary)]",
                        compact ? "size-8" : "size-10",
                      )}
                    >
                      <img
                        src={item.previewUrl}
                        alt=""
                        className="size-full object-cover"
                      />
                    </div>
                  ) : (
                    <Medallion
                      data-slot="medallion"
                      color="blue"
                      tone="pastel"
                      size={medallionSize}
                      icon={fileIcon}
                    />
                  )}
                  <div
                    data-slot="body"
                    className="flex min-w-0 flex-1 flex-col gap-1"
                  >
                    <div
                      data-slot="title-row"
                      className="flex flex-wrap items-center gap-2"
                    >
                      <p
                        data-slot="file-name"
                        className={cn(
                          "truncate font-sans font-uds-semibold text-[var(--uds-text-primary)]",
                          compact
                            ? "text-uds-14 leading-uds-14"
                            : "text-uds-16 leading-uds-16",
                        )}
                      >
                        {item.name}
                      </p>
                      <Badge
                        size={compact ? "sm" : "default"}
                        accent={statusConfig.accent}
                        appearance="pastel"
                        shape="pill"
                      >
                        {statusConfig.label}
                      </Badge>
                    </div>
                    {metadata.length > 0 ? (
                      <p
                        data-slot="metadata"
                        className={cn(
                          "font-sans font-uds-regular text-[var(--uds-text-secondary)]",
                          compact
                            ? "text-uds-12 leading-uds-12"
                            : "text-uds-14 leading-uds-14",
                        )}
                      >
                        {metadata.join(" · ")}
                      </p>
                    ) : null}
                    {status === "uploading" ? (
                      <Progress value={item.progress ?? 0} />
                    ) : null}
                    {status === "error" && item.errorMessage ? (
                      <p
                        data-slot="error-message"
                        className="font-sans text-uds-12 font-uds-regular leading-uds-12 text-destructive"
                      >
                        {item.errorMessage}
                      </p>
                    ) : null}
                  </div>
                  {!isDisabled ? (
                    <div
                      data-slot="actions"
                      className="flex shrink-0 items-center gap-2"
                    >
                      {onView ? (
                        <button
                          type="button"
                          aria-label={`View ${item.name}`}
                          onClick={() => onView(item)}
                          className={cn(
                            "inline-flex cursor-pointer items-center justify-center rounded-[8px] text-[var(--uds-text-secondary)] transition-colors hover:bg-[var(--uds-surface-tertiary)] hover:text-[var(--uds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                            compact ? "size-7" : "size-8",
                          )}
                        >
                          <EyeIcon aria-hidden className={compact ? "size-3.5" : "size-4"} />
                        </button>
                      ) : null}
                      {onDownload ? (
                        <button
                          type="button"
                          aria-label={`Download ${item.name}`}
                          onClick={() => onDownload(item)}
                          className={cn(
                            "inline-flex cursor-pointer items-center justify-center rounded-[8px] text-[var(--uds-text-secondary)] transition-colors hover:bg-[var(--uds-surface-tertiary)] hover:text-[var(--uds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                            compact ? "size-7" : "size-8",
                          )}
                        >
                          <DownloadSimpleIcon
                            aria-hidden
                            className={compact ? "size-3.5" : "size-4"}
                          />
                        </button>
                      ) : null}
                      {status === "error" && onRetry ? (
                        <button
                          type="button"
                          aria-label={`Retry ${item.name}`}
                          onClick={() => onRetry(item)}
                          className={cn(
                            "inline-flex cursor-pointer items-center justify-center rounded-[8px] text-[var(--uds-text-secondary)] transition-colors hover:bg-[var(--uds-surface-tertiary)] hover:text-[var(--uds-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                            compact ? "size-7" : "size-8",
                          )}
                        >
                          <ArrowClockwiseIcon
                            aria-hidden
                            className={compact ? "size-3.5" : "size-4"}
                          />
                        </button>
                      ) : null}
                      {canRemove ? (
                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => {
                            setItems(
                              selectedItems.filter((_, fileIndex) => fileIndex !== index),
                            )
                          }}
                          className={cn(
                            "inline-flex cursor-pointer items-center justify-center rounded-[8px] text-[var(--uds-text-secondary)] transition-colors",
                            "hover:bg-[var(--uds-surface-tertiary)] hover:text-[var(--uds-text-primary)]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                            compact ? "size-7" : "size-8",
                          )}
                        >
                          <XIcon aria-hidden className={compact ? "size-3.5" : "size-4"} />
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export { FileUploadCards }
