import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import {
  Associate,
  AssociateForm,
  StorageState
} from '../../models';

import { MatSelectChange } from '@angular/material/select';
import { AppService } from '../../services';

@Component({
  selector: 'associate-dialog',
  templateUrl: 'associate.dialog.html'
})
export class AssociateDialog implements OnInit {
  private root = 'reactive-forms';
  private module = 'associate';

  state: StorageState<Associate>;
  form: FormGroup;

  constructor(
    private dialog: MatDialogRef<AssociateDialog>,
    private fb: FormBuilder,
    public app: AppService,
    @Inject(MAT_DIALOG_DATA) public associate: Associate
  ) { }

  private load = () => {
    const key = this.associate?.id
      ? this.associate.id.toString()
      : 'new';

    this.state = new StorageState(this.root, this.module, key);

    const ass = this.state.hasState
      ? this.state.getState()
      : this.associate;

    if (ass?.divisionId)
      this.app.getPositions(ass.divisionId);

    this.form = AssociateForm(ass, this.fb);
  }

  ngOnInit() {
    this.app.getDivisions();

    this.load();

    this.form
      .valueChanges
      .subscribe((associate: Associate) => this.state.updateState(associate));
  }

  get executiveId() { return this.form?.get('executiveId') }
  get divisionId() { return this.form?.get('divisionId') }
  get positionId() { return this.form?.get('positionId') }
  get lastName() { return this.form?.get('lastName') }
  get firstName() { return this.form?.get('firstName') }
  get jobTitle() { return this.form?.get('jobTitle') }
  get email() { return this.form?.get('email') }
  get phone() { return this.form?.get('phone') }

  clearCache = () => {
    this.form.reset(this.associate, { emitEvent: false });

    this.associate?.divisionId
      ? this.app.getPositions(this.associate.divisionId)
      : this.app.clearPositions();

    this.state.clearState();
  }

  selectDivision = (event: MatSelectChange) => this.app.getPositions(event.value);

  save = () => {
    if (this.form?.valid) {
      this.form?.value?.id
        ? this.app.updateAssociate(this.form.value)
        : this.app.addAssociate(this.form.value);

      this.clearCache();
      this.dialog.close(true);
    }
  }
}
