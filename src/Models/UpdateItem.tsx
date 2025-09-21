export interface UpdateItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'success' | 'warning' | 'info';
}