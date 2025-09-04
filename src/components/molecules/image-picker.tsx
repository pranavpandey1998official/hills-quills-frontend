"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = {
  value?: File 
  onChange: (file: File | undefined) => void
  placeholderSrc?: string
  ariaLabel?: string
  className?: string
  aspectRatio?: "16/9" | "9/16" | "1/1" // Default 16/9 for backward compatibility
}

export function ImagePicker({ value, onChange, placeholderSrc = '/images/placeholder.png', ariaLabel = "Upload image", className, aspectRatio = "16/9" }: Props) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  // Map aspect ratio to Tailwind classes
  const aspectRatioClass = {
    "16/9": "aspect-video",
    "9/16": "aspect-[9/16]", 
    "1/1": "aspect-square"
  }[aspectRatio]

  React.useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [value])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const file = e.target.files?.[0]
    if (!file) {
      onChange(undefined)
      return
    }
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.")
      onChange(undefined)
      return
    }
    onChange(file)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="rounded-md border bg-muted/20">
        <div className="flex items-start gap-4">
          <div className={`${aspectRatioClass} w-full overflow-hidden rounded border bg-background`}>
            <img
              src={previewUrl ?? placeholderSrc}
              alt={previewUrl ? "Selected image preview" : "Placeholder image"}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label={ariaLabel}
          onChange={handleFileChange}
        />
        <Button type="button" onClick={() => inputRef.current?.click()}>
          {value ? "Change image" : "Upload image"}
        </Button>
        {value && (
          <Button type="button" variant="secondary" onClick={() => onChange(undefined)}>
            Remove
          </Button>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
