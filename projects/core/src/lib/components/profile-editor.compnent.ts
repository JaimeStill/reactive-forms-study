import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import {
  FormGroup,
  FormControl
} from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

import { Profile } from '../models';

@Component({
  selector: 'profile-editor',
  templateUrl: 'profile-editor.component.html'
})
export class ProfileEditorComponent implements OnInit {
  @Output() update = new EventEmitter<Profile | null>();

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl('')
  });

  ngOnInit() {
    this.profileForm
      .valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value: Profile) => this.update.emit(value));
  }
}
