export interface CompletionStream {
  partialText: string;
  status: CompletionStreamStatus;
}

export type CompletionStreamStatus =
  | 'idle'
  | 'start'
  | 'streaming'
  | 'finished'
  | 'error';
