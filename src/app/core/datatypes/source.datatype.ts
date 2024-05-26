import { SourceType } from '@core/enums';
import { Entity } from './entity.datatype';
import { Query } from './query.datatype';

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

export interface UploadSourceConfig {
  maxFileSize?: number;
  maxFiles?: number;
}
