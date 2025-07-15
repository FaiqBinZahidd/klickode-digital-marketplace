import { useState, useRef } from 'react'
import { Upload, X, File, Image, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { uploadFile, getPublicUrl, STORAGE_BUCKETS } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FileUploadProps {
  bucket: keyof typeof STORAGE_BUCKETS
  path: string
  accept?: string
  maxSize?: number // in MB
  onUploadComplete?: (url: string, path: string) => void
  onError?: (error: string) => void
  className?: string
  multiple?: boolean
}

export default function FileUpload({
  bucket,
  path,
  accept = '*/*',
  maxSize = 10,
  onUploadComplete,
  onError,
  className,
  multiple = false,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setError(null)
    setUploading(true)
    setProgress(0)

    try {
      const fileArray = Array.from(files)
      const uploadedUrls: string[] = []

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i]
        
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          throw new Error(`File ${file.name} exceeds maximum size of ${maxSize}MB`)
        }

        // Create unique filename
        const timestamp = Date.now()
        const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
        const filePath = `${path}/${filename}`

        // Upload file
        await uploadFile(bucket, file, filePath)
        
        // Get public URL
        const publicUrl = getPublicUrl(bucket, filePath)
        uploadedUrls.push(publicUrl)

        // Update progress
        setProgress(((i + 1) / fileArray.length) * 100)

        // Callback for each file
        if (onUploadComplete) {
          onUploadComplete(publicUrl, filePath)
        }
      }

      setUploadedFiles(prev => [...prev, ...uploadedUrls])
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed'
      setError(errorMessage)
      if (onError) {
        onError(errorMessage)
      }
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url)
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer transition-colors',
          'hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950/10',
          uploading && 'pointer-events-none opacity-50'
        )}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFileSelect(e.target.files)}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full">
            <Upload className="w-8 h-8 text-gray-500" />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Drop files here or click to upload
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {accept !== '*/*' ? `Accepts: ${accept}` : 'Any file type'} • Max {maxSize}MB
            </p>
          </div>

          {!uploading && (
            <Button variant="outline" className="mt-4">
              <Upload className="w-4 h-4 mr-2" />
              Select Files
            </Button>
          )}
        </div>
      </div>

      {uploading && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Uploading...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {error && (
        <Alert className="mt-4" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-900 dark:text-white">
            Uploaded Files
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {uploadedFiles.map((url, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex-shrink-0">
                  {isImage(url) ? (
                    <img
                      src={url}
                      alt="Uploaded"
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <File className="w-5 h-5 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {url.split('/').pop()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {bucket} bucket
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}