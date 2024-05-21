export interface Toast {
  text: string;
  type: 'success' | 'error' | 'warning';
  duration?: number;
  id?: string;
}
