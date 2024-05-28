import { Injectable, inject } from '@angular/core';
import { FileValidatorService } from './file-validator.service';
import {
  FileLoaderConfig,
  UploadedFile,
  UploadedFiles,
} from '@shared/datatypes';

@Injectable({
  providedIn: 'root',
})
export class FileLoaderService {
  readonly #fileValidator = inject(FileValidatorService);

  processFiles(files: FileList, config: FileLoaderConfig): UploadedFiles {
    const uploadedFiles: UploadedFiles = [];
    const isMultiple = config.multiple || false;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const uploadedFile: UploadedFile = this.#createUploadedFile(file, config);
      uploadedFiles.push(uploadedFile);
      if (!isMultiple) break;
    }
    return uploadedFiles;
  }

  /**
   * Create an Uploaded File object.
   * @param file - Uploaded File
   * @returns Uploaded File Object
   */
  #createUploadedFile(file: File, config: FileLoaderConfig): UploadedFile {
    const uploadedFile: UploadedFile = {
      file,
      hasErrors: false,
      errors: null,
    };
    this.#fileValidator.applyValidationErrors(uploadedFile, config);
    return uploadedFile;
  }
}
