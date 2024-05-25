export interface MaxSize {
  [key: string]: number;
}

export interface UploadedFile {
  file: File;
  hasErrors: boolean;
  errors: { [key: string]: unknown };
}
