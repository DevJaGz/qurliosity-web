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
}
