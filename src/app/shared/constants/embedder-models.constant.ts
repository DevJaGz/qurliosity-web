import { EmbedderModels } from '@shared/datatypes';

export const OPENAI_EMBEDDER_MODELS: EmbedderModels = [
  {
    name: 'text-embedding-ada-002',
    input: 8191,
    output: 1536,
  },
  {
    name: 'text-similarity-davinci-001',
    input: 2048,
    output: 12288,
  },
  {
    name: 'text-similarity-curie-001',
    input: 2048,
    output: 4096,
  },
  {
    name: 'text-similarity-babbage-001',
    input: 2048,
    output: 2048,
  },
  {
    name: 'text-similarity-ada-001',
    input: 2048,
    output: 1024,
  },
  {
    name: 'text-search-davinci-doc-001',
    input: 2048,
    output: 12288,
  },
  {
    name: 'text-search-curie-doc-001',
    input: 2048,
    output: 4096,
  },
  {
    name: 'text-search-babbage-doc-001',
    input: 2048,
    output: 2048,
  },
  {
    name: 'text-search-ada-doc-001',
    input: 2048,
    output: 1024,
  },
  {
    name: 'text-search-davinci-query-001',
    input: 2048,
    output: 12288,
  },
  {
    name: 'text-search-curie-query-001',
    input: 2048,
    output: 4096,
  },
  {
    name: 'text-search-babbage-query-001',
    input: 2048,
    output: 2048,
  },
  {
    name: 'text-search-ada-query-001',
    input: 2048,
    output: 1024,
  },
  {
    name: 'code-search-babbage-code-001',
    input: 2048,
    output: 2048,
  },
  {
    name: 'code-search-ada-code-001',
    input: 2048,
    output: 1024,
  },
];
