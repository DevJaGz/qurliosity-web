import { EmbedderCredential } from './embedder-credential.datatype';
import { LLMCredential } from './llm-credential.datatype';

export interface AICredentials {
  embedderCredential: null | EmbedderCredential;
  LLMCredential: null | LLMCredential;
}
