"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { FileUploadProps } from "@/types";

const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024; // 10MB in bytes
const ACCEPTED_TYPES = [".pdf", ".docx", ".doc"];

export function FileUpload({
  onFileSelect,
  maxSize = MAX_SIZE_BYTES,
  acceptedTypes = ACCEPTED_TYPES
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Clear previous error
      setError(null);

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0]?.code === "file-too-large") {
          setError(`File size must be under ${MAX_SIZE_MB}MB`);
        } else if (rejection.errors[0]?.code === "file-invalid-type") {
          setError("Please upload a PDF, DOCX, or DOC file only");
        } else {
          setError("Invalid file. Please try again.");
        }
        onFileSelect(null);
        setSelectedFile(null);
        return;
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        // Additional validation
        if (file.size === 0) {
          setError("File appears to be empty");
          onFileSelect(null);
          setSelectedFile(null);
          return;
        }

        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize,
    maxFiles: 1,
    multiple: false,
  });

  // Format file size for display
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
          transition-all duration-200
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : selectedFile
              ? "border-green-500 bg-green-50"
              : error
              ? "border-red-500 bg-red-50"
              : "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50"
          }
        `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center space-y-4">
          {/* Icon */}
          {selectedFile ? (
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          ) : error ? (
            <AlertCircle className="w-12 h-12 text-red-600" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}

          {/* Main text */}
          {selectedFile ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5 text-green-600" />
                <p className="text-lg font-medium text-green-700">
                  {selectedFile.name}
                </p>
              </div>
              <p className="text-sm text-gray-600">
                {formatFileSize(selectedFile.size)} • {selectedFile.type || "Unknown type"}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Click or drag to change file
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-700">
                {isDragActive
                  ? "Drop your CV here..."
                  : "Drag & drop your CV here, or click to browse"}
              </p>
              <p className="text-sm text-gray-500">
                Accepted formats: PDF, DOCX, DOC (max {MAX_SIZE_MB}MB)
              </p>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="bg-red-100 border border-red-300 rounded-lg px-4 py-2 mt-2">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
