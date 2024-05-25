export interface MaxFileSize {
  [key: string]: number;
}

export interface UploadedFile {
  file: File;
  hasErrors: boolean;
  errors: { [key: string]: unknown };
}

export type UploadedFiles = UploadedFile[];

export interface FileLoaderConfig {
  maxSize?: number | MaxFileSize; // Max size in bytes or max size per file type
  accept?: string; // Accepted file types
  multiple?: boolean; // Allow multiple files
}
