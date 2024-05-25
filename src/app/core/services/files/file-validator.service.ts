import { Injectable, inject } from '@angular/core';
import {
  FileLoaderConfig,
  UploadedFile,
  ValidationFileErrors,
} from '@shared/datatypes';
import { MimeTypeService } from './mime-type.service';

@Injectable({
  providedIn: 'root',
})
export class FileValidatorService {
  readonly #mimeTypesService = inject(MimeTypeService);

  /**
   * Apply the validation errors to the Uploaded File Object.
   * @param uploadedFile - Uploaded File Object
   */
  applyValidationErrors(
    uploadedFile: UploadedFile,
    config: FileLoaderConfig
  ): void {
    const applyValidationError = (validationErrors: ValidationFileErrors) => {
      uploadedFile.errors = {
        ...uploadedFile.errors,
        ...validationErrors,
      };
    };

    const { file } = uploadedFile;
    const type = file.type ? file.type : null;
    const size = file.size ? file.size : null;

    const validationFileSizeErrors = this.validateFileSize(type, size, config);
    if (validationFileSizeErrors) {
      applyValidationError(validationFileSizeErrors);
    }

    const validationFileTypeErrors = this.hasFileValidType(type, config);
    if (validationFileTypeErrors) {
      applyValidationError(validationFileTypeErrors);
    }

    uploadedFile.hasErrors = Boolean(Object.keys(uploadedFile.errors).length);
  }

  /**
   * Validate if the size of the file is valid
   * @param type - File type
   * @param size - File Size
   * @returns Null if the File size is valid, otherwise it will return an object with
   * the errors.
   */
  validateFileSize(
    type: string | null,
    size: number | null,
    config: FileLoaderConfig
  ): ValidationFileErrors {
    const maxSize = config.maxSize;

    if (maxSize === undefined || maxSize === -1) return null;

    const matchFn = (limitSize: number) => {
      const currentSize = size || 0;
      return currentSize <= limitSize
        ? null
        : { size: { currentSize, limitSize } };
    };

    if (typeof maxSize === 'object' && type) {
      const keyMaxSize = Object.keys(maxSize).find((acceptedType) =>
        this.hasExtensionInCommon(type, acceptedType)
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
   * @param type - Value to check
   * @returns Null if the Type is valid, otherwise it will return an object with
   * the errors.
   */
  private hasFileValidType(
    type: string | null,
    config: FileLoaderConfig
  ): ValidationFileErrors {
    const accept = config.accept;

    if (!accept || accept === '*') return null;

    if (type) {
      // Create an array of the accepted types
      const acceptedTypes = accept.split(',').map((v) => v.trim());

      // Validate if the type is valid
      const isValidType = acceptedTypes.some((acceptedType) =>
        this.hasExtensionInCommon(type, acceptedType)
      );
      return isValidType
        ? null
        : { type: { currentType: type, acceptedTypes } };
    }

    return null;
  }

  /**
   * Check if the type has an extension in common with the acceptedType
   * @param type - Type comming from the HTML Input File
   * @param acceptedType - Type to compare with
   * @returns True if the type is valid
   */
  private hasExtensionInCommon(type: string, acceptedType: string): boolean {
    // Get the all extensions related with the type
    const extensionsForType = this.#mimeTypesService.getAllExtensions(type);
    // Get the all extensions related with the accepted type
    const extensionsForAcceptedType =
      this.#mimeTypesService.getAllExtensions(acceptedType);

    // Continue with the next accepted type in case there are not
    // extensions related with the type
    if (!extensionsForType.length) {
      return false;
    }

    // Validate if the type and the accepted type has a extension in common,
    // if so, finalize the validation. That in case there are accepted extensions
    // available.
    if (extensionsForAcceptedType.length) {
      return extensionsForType.some((availableTypeExtension) =>
        extensionsForAcceptedType.includes(availableTypeExtension)
      );
    }

    // At this point, any extension where found for the accepted type
    // maybe because the accepted type is an extension with dot (".mp3"), so
    // as last try, the extension is extracted manually and then check.
    const extension = acceptedType.split('.').pop();
    return extensionsForType.some(
      (availableTypeExtension) => availableTypeExtension === extension
    );
  }
}
