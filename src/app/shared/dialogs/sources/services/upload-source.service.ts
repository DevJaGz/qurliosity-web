import { Injectable, Signal, signal } from '@angular/core';
import { UploadedFile, UploadedFiles } from '@shared/datatypes';

@Injectable({
  providedIn: 'root',
})
export class UploadSourceService {
  readonly #displayedFiles = signal<UploadedFiles>([]);

  get displayedFiles(): Signal<UploadedFiles> {
    return this.#displayedFiles.asReadonly();
  }

  upadateDisplayedFiles(newFiles: UploadedFiles): void {
    this.#displayedFiles.update((currentFiles) => [
      ...currentFiles,
      ...newFiles,
    ]);
  }

  setDisplayedFiles(newFiles: UploadedFiles): void {
    this.#displayedFiles.set(newFiles);
  }

  removeFromIndex(index: number): void {
    this.#displayedFiles.update((currentFiles) => {
      const newFiles = currentFiles.filter((_, i) => i !== index);
      return newFiles;
    });
  }

  getDuplicatedFiles(newFiles: UploadedFiles): UploadedFiles {
    const duplicatedFiles: UploadedFiles = [];
    for (const newFile of newFiles) {
      const duplicatedFile = this.getDuplicatedFile(newFile.file);
      if (duplicatedFile) {
        duplicatedFiles.push(duplicatedFile);
      }
    }
    return duplicatedFiles;
  }

  getDuplicatedFile(newFile: File): UploadedFile | null {
    const currentFiles = this.#displayedFiles();
    return currentFiles.find((f) => f.file.name === newFile.name) || null;
  }

  getFilesToDisplay(newFiles: UploadedFiles, maxFiles: number): UploadedFiles {
    const currentFiles = this.#displayedFiles();
    const currentNumberFiles = currentFiles.length;
    const filesToDisplay = newFiles.slice(0, maxFiles - currentNumberFiles);
    return filesToDisplay;
  }

  hasExceedMaxFileLimit(newFiles: UploadedFiles, maxFiles: number): boolean {
    const currentFiles = this.#displayedFiles();
    const currentNumberFiles = currentFiles.length;
    const newNumberFiles = newFiles.length;
    const isOverMaxFiles = newNumberFiles + currentNumberFiles > maxFiles;
    return isOverMaxFiles;
  }

  reset(): void {
    this.#displayedFiles.set([]);
  }
}
