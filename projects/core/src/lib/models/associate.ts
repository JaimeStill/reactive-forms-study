import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Executive } from './executive';
import { Person } from './person';

export interface Associate extends Person {
  executiveId: number;
  email: string;
  phone: string;

  executive?: Executive;
}

export const AssociateForm = (associate: Associate, fb: FormBuilder): FormGroup =>
  fb.group({
    id: [associate.id],
    executiveId: [associate.executiveId, Validators.required],
    positionId: [associate.positionId, Validators.required],
    lastName: [associate.lastName, Validators.required],
    firstName: [associate.firstName, Validators.required],
    middleName: [associate.middleName],
    jobTitle: [associate.jobTitle, Validators.required],
    email: [
      associate.email,
      [
        Validators.required,
        Validators.email
      ]
    ],
    phone: [
      associate.phone,
      Validators.required
    ],
    isActive: [associate.isActive],
    address: fb.group({
      street: [associate.address.street],
      city: [associate.address.city],
      state: [associate.address.state],
      zip: [associate.address.zip]
    })
  })
