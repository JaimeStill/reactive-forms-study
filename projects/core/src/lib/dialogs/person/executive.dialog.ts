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
  Executive,
  ExecutiveForm,
  StorageState
} from '../../models';

import {
  AppService,
  CoreService,
} from '../../services';

import {
  FormBuilder,
  FormGroup
} from '@angular/forms';

import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'executive-dialog',
  templateUrl: 'executive.dialog.html'
})
export class ExecutiveDialog implements OnInit {
  private root = 'reactive-forms';
  private module = 'executive';

  state: StorageState<Executive>;
  form: FormGroup;

  constructor(
    private core: CoreService,
    private dialog: MatDialogRef<ExecutiveDialog>,
    private fb: FormBuilder,
    public app: AppService,
    @Inject(MAT_DIALOG_DATA) public executive: Executive
  ) { }

  private load = () => {
    const key = this.executive?.id
      ? this.executive.id.toString()
      : 'new';

    this.state = new StorageState(this.root, this.module, key);

    const exec = this.state.hasState
      ? this.state.getState()
      : this.executive;

    if (exec?.divisionId)
      this.app.getPositions(exec.divisionId);

    this.form = ExecutiveForm(exec, this.fb, this.core.ssnPattern);
  }

  private update = (executive: Executive) => this.state.updateState(executive);

  ngOnInit() {
    this.app.getDivisions();
    this.app.getOrganizations();

    this.load();

    this.form
      .valueChanges
      .subscribe((executive: Executive) => this.update(executive));
  }

  get organizationId() { return this.form?.get('organizationId') }
  get divisionId() { return this.form?.get('divisionId') }
  get positionId() { return this.form?.get('positionId') }
  get lastName() { return this.form?.get('lastName') }
  get firstName() { return this.form?.get('firstName') }
  get jobTitle() { return this.form?.get('jobTitle') }
  get ssn() { return this.form?.get('ssn') }

  clearCache = () => {
    this.form.reset(this.executive, { emitEvent: false });
    this.app.getPositions(this.executive?.divisionId);
    this.state.clearState();
  }

  selectDivision = (event: MatSelectChange) => this.app.getPositions(event.value);

  save = () => {
    if (this.form?.valid) {
      this.form?.value?.id
        ? this.app.updateExecutive(this.form.value)
        : this.app.addExecutive(this.form.value);

      this.clearCache();
      this.dialog.close(true);
    }
  }
}
