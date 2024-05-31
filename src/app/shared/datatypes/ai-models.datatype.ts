export interface EmbedderModel {
  name: string;
  input: number;
  output: number;
}

export type EmbedderModels = EmbedderModel[];

export interface LLMModel {
  name: string;
  contextWindow: number;
  lastUpdate: string;
}

export type LLMModels = LLMModel[];
