import { Injectable, inject } from '@angular/core';
import {
  FileLoaderConfig,
  UploadedFile,
  ValidationFileErrors,
} from '@shared/datatypes';
import { MimeTypeService } from './mime-type.service';
import { getExtensionFromName } from '@core/utils';

@Injectable({
  providedIn: 'root',
})
export class FileValidatorService {
  readonly #mimeTypesService = inject(MimeTypeService);

  readonly #applyValidationErrorFn = (
    uploadedFile: UploadedFile,
    validationErrors: ValidationFileErrors
  ) => {
    uploadedFile.errors = {
      ...uploadedFile.errors,
      ...validationErrors,
    };
  };

  /**
   * Apply the validation errors to the Uploaded File Object.
   * @param uploadedFile - Uploaded File Object
   */
  applyValidationErrors(
    uploadedFile: UploadedFile,
    config: FileLoaderConfig
  ): void {
    const { file } = uploadedFile;
    const type = file.type ? file.type : null;
    const size = file.size ? file.size : null;

    const validationFileSizeErrors = this.validateFileSize(
      uploadedFile,
      config
    );
    if (validationFileSizeErrors) {
      this.#applyValidationErrorFn(uploadedFile, validationFileSizeErrors);
    }

    const validationFileTypeErrors = this.validateFileType(
      uploadedFile,
      config
    );
    if (validationFileTypeErrors) {
      this.#applyValidationErrorFn(uploadedFile, validationFileTypeErrors);
    }

    uploadedFile.hasErrors = Boolean(uploadedFile.errors);
  }

  /**
   * Validate if the size of the file is valid
   * @param fileType - File type
   * @param fileSize - File Size
   * @returns Null if the File size is valid, otherwise it will return an object with
   * the errors.
   */
  validateFileSize(
    uploadedFile: UploadedFile,
    config: FileLoaderConfig
  ): ValidationFileErrors {
    const maxSize = config.maxSize;
    const fileSize = uploadedFile.file.size;
    const fileType = uploadedFile.file.type;

    if (maxSize === undefined || maxSize === -1) return null;

    const matchFn = (limitSize: number) => {
      const currentSize = fileSize || 0;
      return currentSize <= limitSize
        ? null
        : { size: { currentSize, limitSize } };
    };

    if (typeof maxSize === 'object' && fileType) {
      const keyMaxSize = Object.keys(maxSize).find((acceptedType) =>
        this.#hasExtensionInCommon(fileType, acceptedType)
      );
      if (keyMaxSize) {
        const limitSize = maxSize[keyMaxSize];
        return matchFn(limitSize);
      }
    }

    if (typeof maxSize === 'number') {
      return matchFn(maxSize);
    }

    return null;
  }

  /**
   * Validate if a type is valid for for the types passed in the "accept" input
   * @param fileType - Value to check
   * @returns Null if the Type is valid, otherwise it will return an object with
   * the errors.
   */
  validateFileType(
    uploadedFile: UploadedFile,
    config: FileLoaderConfig
  ): ValidationFileErrors {
    const accept = config.accept;

    if (!accept || accept === '*') return null;

    const acceptedTypes = accept.split(',').map((v) => v.trim());

    const fileType =
      uploadedFile.file.type || getExtensionFromName(uploadedFile.file.name);

    if (fileType) {
      // Create an array of the accepted types

      console.log('acceptedTypes', acceptedTypes);
      // Validate if the type is valid
      const isValidType = acceptedTypes.some((acceptedType) =>
        this.#hasExtensionInCommon(fileType, acceptedType)
      );
      return isValidType
        ? null
        : { type: { currentType: fileType, acceptedTypes } };
    }

    return {
      type: { currentType: 'Unknown', acceptedTypes },
    };
  }

  /**
   * Check if the type has an extension in common with the acceptedType
   * @param fileType - Type comming from the HTML Input File
   * @param acceptedFileType - Type to compare with
   * @returns True if the type is valid
   */
  #hasExtensionInCommon(fileType: string, acceptedFileType: string): boolean {
    const extensionsForFileType =
      this.#mimeTypesService.getAllExtensions(fileType);
    const extensionsForAcceptedFileType =
      this.#mimeTypesService.getAllExtensions(acceptedFileType);

    console.log('extensionsForFileType', extensionsForFileType);
    console.log('extensionsForAcceptedFileType', extensionsForAcceptedFileType);

    // Validate if the file type and the accepted file type has a extension in common,
    // if so, finalize the validation. That in case there are accepted extensions
    // available.
    if (extensionsForAcceptedFileType.length && extensionsForFileType.length) {
      return extensionsForFileType.some((availableTypeExtension) =>
        extensionsForAcceptedFileType.includes(availableTypeExtension)
      );
    }

    // At this point, any extension where found for the accepted type
    // maybe because the accepted type is an extension with dot (".mp3"), so
    // as last try, the extension is extracted manually and then check.
    const extension = getExtensionFromName(acceptedFileType);
    return extensionsForFileType.some(
      (availableTypeExtension) => availableTypeExtension === extension
    );
  }
}
