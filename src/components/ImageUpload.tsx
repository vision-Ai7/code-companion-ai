import { useCallback, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isProcessing?: boolean;
}

export const ImageUpload = ({ onImageSelect, isProcessing }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <Card
        variant="glass"
        className={cn(
          "relative p-4 sm:p-8 transition-all duration-300 cursor-pointer",
          isDragging && "border-primary shadow-[0_0_30px_hsl(173_80%_50%/0.3)]",
          preview && "p-3 sm:p-4"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Code preview"
              className="w-full max-h-[250px] sm:max-h-[400px] object-contain rounded-lg"
            />
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                  <span className="text-xs sm:text-sm text-muted-foreground">Extracting code...</span>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-background h-7 w-7 sm:h-8 sm:w-8"
              onClick={clearPreview}
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-3 sm:gap-4 min-h-[150px] sm:min-h-[200px] cursor-pointer">
            <div className="p-3 sm:p-4 rounded-full bg-primary/10 text-primary animate-pulse-slow">
              <Upload className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="text-center px-2">
              <p className="text-base sm:text-lg font-medium">Drop your code image here</p>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                or click to browse
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
          </label>
        )}
      </Card>

      {!preview && (
        <div className="flex gap-2 sm:gap-3">
          <label className="flex-1">
            <Button variant="outline" className="w-full gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10" asChild>
              <span>
                <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Gallery
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </span>
            </Button>
          </label>
          <label className="flex-1">
            <Button variant="outline" className="w-full gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10" asChild>
              <span>
                <Camera className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Camera
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileInput}
                />
              </span>
            </Button>
          </label>
        </div>
      )}
    </div>
  );
};
