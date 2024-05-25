import { Injectable } from '@angular/core';
import mime from 'mime';

@Injectable({
  providedIn: 'root',
})
export class MimeTypeService {
  getExtension(value: string): string {
    return mime.getExtension(value) || '';
  }

  getAllExtensions(value: string): string[] {
    return Array.from(mime.getAllExtensions(value) || []);
  }

  getContentType(value: string): string {
    return mime.getType(value) || '';
  }
}
