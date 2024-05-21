import { Entity } from './entity.datatype';
import { Query } from './query.datatype';

export interface Template extends Entity {
  name: string;
  description: string;
  isDemo: boolean;
  isActive: boolean;
  titleLabel: string;
  descriptionLabel: string;
  imagePath: string;
  onHoverInfo?: HoverInfoSchema;
  sessionId: string;
}

export interface HoverInfoSchema {
  titleLabel: string;
  descriptionLabel: string;
  imagePath: string;
}

export type Templates = Template[];

export interface QueryTemplate extends Query {
  name?: string;
  isDemo?: boolean;
  isActive?: boolean;
}
