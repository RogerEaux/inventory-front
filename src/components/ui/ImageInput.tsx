import { useFormContext } from 'react-hook-form';
import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { fileToBase64 } from '@/lib/utils';

interface Props {
  name: string;
}

export default function ImageInput({ name }: Props) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fieldError = (errors[name] as { message?: string }) ?? {};
  const errorMessage = fieldError.message;

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setPreview(base64);
    setValue(name, base64, { shouldValidate: true });
    setIsDragging(false);
  };

  const onDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await handleFiles(e.dataTransfer.files);
    setIsDragging(false);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onInteract = () => inputRef.current?.click();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await handleFiles(e.target.files);
  };

  register(name);

  return (
    <div className="relative col-span-2 max-md:col-span-1">
      <div
        tabIndex={0}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={onInteract}
        onKeyDown={(e) => (e.key === 'Enter' ? onInteract() : null)}
        className={`border-gray flex h-[16.4rem] w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed py-32 text-center transition-all duration-200 outline-none focus-visible:ring-2 max-sm:p-16 ${
          isDragging
            ? 'border-black bg-black/25'
            : 'hover:border-black hover:bg-black/25'
        }`}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="h-[10rem] w-auto rounded-md"
          />
        ) : (
          <div className="pointer-events-none flex flex-col items-center gap-2">
            <p className="text-base font-semibold">
              {isDragging ? 'Drop the image here' : 'Upload Image'}
            </p>
            <p className="text-gray text-sm">
              {isDragging
                ? 'Release to upload'
                : 'Drag and drop or click to upload'}
            </p>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={onChange}
      />

      {errorMessage && (
        <p className="text-error absolute -bottom-1/6 text-sm font-medium">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
