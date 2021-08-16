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

  state: Executive;
  divisionId: number;
  executiveState: StorageState<Executive>;
  divisionState: StorageState<number>;
  form: FormGroup;

  constructor(
    private core: CoreService,
    private dialog: MatDialogRef<ExecutiveDialog>,
    private fb: FormBuilder,
    public app: AppService,
    @Inject(MAT_DIALOG_DATA) public executive: Executive
  ) { }

  private load = () => {
    const stateKey = this.executive?.id
      ? this.executive.id.toString()
      : 'new';

    this.executiveState = new StorageState(this.root, this.module, stateKey);
    this.divisionState = new StorageState(this.root, `${this.module}-divsion`, stateKey);

    this.state = this.executiveState.hasState
      ? this.executiveState.getState()
      : this.executive;

    this.divisionId = this.divisionState.hasState
      ? this.divisionState.getState()
      : this.state.position?.divisionId
        ? this.state.position.divisionId
        : null;

    if (this.divisionId)
      this.app.getPositions(this.divisionId);

    this.form = ExecutiveForm(this.state, this.fb, this.core.ssnPattern);
  }

  private update = (executive: Executive) => this.executiveState.updateState(executive);

  ngOnInit() {
    this.app.getDivisions();
    this.app.getOrganizations();

    this.load();

    this.form
      .valueChanges
      .subscribe((executive: Executive) => this.update(executive));
  }

  hasCache = () => this.executiveState.hasState || this.divisionState.hasState;

  clearCache = () => {
    this.form.reset(this.executive, { emitEvent: false });
    this.divisionId = this.executive?.position?.divisionId;
    this.executiveState.clearState();
    this.divisionState.clearState();
  }

  selectDivision = (event: MatSelectChange) => {
    this.divisionId = event.value;
    this.divisionState.updateState(event.value);
    this.app.getPositions(event.value);
  }

  save = () => {
    if (this.form.valid) {
      this.form.value.id
        ? this.app.updateExecutive(this.form.value)
        : this.app.addExecutive(this.form.value);

      this.clearCache();
      this.dialog.close(true);
    }
  }
}
