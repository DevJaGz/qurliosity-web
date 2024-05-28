import { SourceType } from '@core/enums';
import { Entity } from './entity.datatype';
import { Query } from './query.datatype';
import { EmbedderCredential } from './embedder-credential.datatype';

export interface Source extends Entity {
  _templateId: string;
  type: SourceType;
  value: string;
  _storageRecordId?: string;
  userId?: string;
}

export type Sources = Source[];

export interface QuerySource extends Query {
  type?: SourceType;
}

export interface ListSources extends QuerySource {
  _templateId: string;
}

export interface CreatePDFSource {
  _templateId: string;
  file: File;
  embedderCredential: EmbedderCredential;
}

export interface UploadSourceConfig {
  maxFileSize?: number;
  maxFiles?: number;
}
