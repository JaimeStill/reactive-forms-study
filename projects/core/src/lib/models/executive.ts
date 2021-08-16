import { Associate } from './associate';
import { Organization } from './organization';
import { Person } from './person';

export interface Executive extends Person {
  organizationId: number;
  ssn: string;

  organization?: Organization;

  associates?: Associate[];
}
