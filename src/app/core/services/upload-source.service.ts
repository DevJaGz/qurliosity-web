import { Injectable } from '@angular/core';
import { UploadedFile, UploadedFiles } from '@shared/datatypes';

@Injectable({
  providedIn: 'root',
})
export class UploadSourceService {
  getDuplicatedFiles(
    currentFiles: UploadedFiles,
    newFiles: UploadedFiles
  ): UploadedFiles {
    const duplicatedFiles: UploadedFiles = [];
    for (const newFile of newFiles) {
      const duplicatedFile = this.getDuplicatedFile(currentFiles, newFile.file);
      if (duplicatedFile) {
        duplicatedFiles.push(duplicatedFile);
      }
    }
    return duplicatedFiles;
  }

  getDuplicatedFile(
    currentFiles: UploadedFiles,
    newFile: File
  ): UploadedFile | null {
    return currentFiles.find((f) => f.file.name === newFile.name) || null;
  }

  getFilesToDisplay(
    currentFiles: UploadedFiles,
    newFiles: UploadedFiles,
    maxFiles: number
  ): UploadedFiles {
    const currentNumberFiles = currentFiles.length;
    const filesToDisplay = newFiles.slice(0, maxFiles - currentNumberFiles);
    return filesToDisplay;
  }

  isOverMaxFiles(
    currentFiles: UploadedFiles,
    newFiles: UploadedFiles,
    maxFiles: number
  ): boolean {
    const currentNumberFiles = currentFiles.length;
    const newNumberFiles = newFiles.length;
    const isOverMaxFiles = newNumberFiles + currentNumberFiles > maxFiles;
    return isOverMaxFiles;
  }
}
