import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'name-editor',
  templateUrl: 'name-editor.component.html'
})
export class NameEditorComponent implements OnInit {
  name = new FormControl('');

  @Output() update = new EventEmitter<string>();

  ngOnInit() {
    this.name
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => this.update.emit(value));
  }
}
