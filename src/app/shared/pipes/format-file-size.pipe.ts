import { Pipe, PipeTransform, inject } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Pipe({
  name: 'formatFileSize',
  standalone: true,
})
export class FormatFileSizePipe implements PipeTransform {
  #config = inject(PrimeNGConfig);

  transform(bytes: number): string {
    const k = 1024;
    const dm = 3;
    const sizes = this.#config.translation.fileSizeTypes;
    if (!sizes) {
      return String(bytes);
    }

    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }
}
