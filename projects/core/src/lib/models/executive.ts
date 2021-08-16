import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Associate } from './associate';
import { Organization } from './organization';
import { Person } from './person';

export interface Executive extends Person {
  organizationId: number;
  ssn: string;

  organization?: Organization;

  associates?: Associate[];
}

export const ExecutiveForm = (executive: Executive, fb: FormBuilder, ssnPattern: RegExp): FormGroup =>
  fb.group({
    id: [executive.id],
    organizationId: [executive.organizationId, Validators.required],
    positionId: [executive.positionId, Validators.required],
    lastName: [executive.lastName, Validators.required],
    firstName: [executive.firstName, Validators.required],
    middleName: [executive.middleName],
    jobTitle: [executive.jobTitle, Validators.required],
    ssn: [
      executive.ssn,
      Validators.required,
      Validators.pattern(ssnPattern)
    ],
    isActive: [executive.isActive],
    address: fb.group({
      street: [executive.address.street],
      city: [executive.address.city],
      state: [executive.address.state],
      zip: [executive.address.zip]
    })
  })
