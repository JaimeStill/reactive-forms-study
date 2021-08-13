import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { Dialogs } from './dialogs';
import { Directives } from './directives';
import { Pipes } from './pipes';

@NgModule({
  declarations: [
    ...Dialogs,
    ...Directives,
    ...Pipes
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    ...Dialogs,
    ...Directives,
    ...Pipes,
    MaterialModule
  ]
})
export class CoreModule { }
