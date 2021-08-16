import { Executive } from './executive';
import { Person } from './person';

export interface Associate extends Person {
  executiveId: number;
  phone: string;
  email: string;

  executive?: Executive;
}
