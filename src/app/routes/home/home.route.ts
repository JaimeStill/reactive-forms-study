import {
  Component,
  OnInit
} from '@angular/core';

import {
  Address,
  AppService,
  Associate,
  AssociateDialog,
  ConfirmDialog,
  Executive,
  ExecutiveDialog
} from 'core';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html'
})
export class HomeRoute implements OnInit {
  executive: Executive;

  constructor(
    private dialog: MatDialog,
    public app: AppService
  ) { }

  ngOnInit() {
    this.app.getExecutives();
  }

  selected = (e: Executive) => e?.id === this.executive?.id;

  selectExecutive = (e: Executive) => {
    if (this.selected(e)) {
      this.executive = null;
      this.app.clearAssociates();
    } else {
      this.executive = e;
      this.app.getAssociates(e.id);
    }
  }

  addExecutive = () => this.dialog.open(ExecutiveDialog, {
    data: {
      address: {} as Address
    } as Executive,
    disableClose: true,
    width: '480px'
  })
  .afterClosed()
  .subscribe(res => res && this.app.getExecutives());

  editExecutive = (e: Executive) => this.dialog.open(ExecutiveDialog, {
    data: Object.assign({} as Executive, e),
    disableClose: true,
    width: '480px'
  })
  .afterClosed()
  .subscribe(res => res && this.app.getExecutives());

  removeExecutive = (e: Executive) => this.dialog.open(ConfirmDialog, {
    data: {
      title: 'Remove Executive?',
      content: `Are you sure you want to remove ${e.lastName}, ${e.firstName}?`
    },
    disableClose: true,
    autoFocus: false
  })
  .afterClosed()
  .subscribe(res => {
    if (res) {
      this.app.removeExecutive(e);
      this.app.getExecutives();
    }
  });

  addAssociate = () => this.dialog.open(AssociateDialog, {
    data: {
      executiveId: this.executive?.id,
      address: {} as Address
    } as Associate,
    disableClose: true,
    width: '480px'
  })
  .afterClosed()
  .subscribe(res => res && this.executive?.id && this.app.getAssociates(this.executive.id));

  editAssociate = (a: Associate) => this.dialog.open(AssociateDialog, {
    data: Object.assign({} as Associate, a),
    disableClose: true,
    width: '480px'
  })
  .afterClosed()
  .subscribe(res => res && this.executive?.id && this.app.getAssociates(this.executive.id));

  removeAssociate = (a: Associate) => this.dialog.open(ConfirmDialog, {
    data: {
      title: 'Remove Associate?',
      content: `Are you sure you want to remove ${a.lastName}, ${a.firstName}?`
    },
    disableClose: true,
    autoFocus: false
  })
  .afterClosed()
  .subscribe(res => {
    if (res) {
      this.app.removeAssociate(a);
      this.executive && this.app.getAssociates(this.executive.id);
    }
  });
}

