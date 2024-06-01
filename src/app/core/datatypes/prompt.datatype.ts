import { Entity } from './entity.datatype';

export interface Prompt extends Entity {
  _templateId: string;
  value: string;
  vars: PromptVars;
}

export interface PromptVars {
  [key: string]: string;
}

export type Prompts = Prompt[];
