import {
  Component,
  OnInit
} from '@angular/core';

import {
  Address,
  AppService,
  Associate,
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

  addAssociate = () => { }

  editAssociate = (a: Associate) => { }
}

