import { Executive } from './executive';

export interface Organization {
  id: number;
  value: string;

  executives?: Executive[];
}
