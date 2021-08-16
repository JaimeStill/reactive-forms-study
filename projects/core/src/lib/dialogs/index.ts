import { ConfirmDialog } from './confirm';

import { PersonDialogs } from './person';

export const Dialogs = [
  ConfirmDialog,
  ...PersonDialogs
];

export * from './confirm';
export * from './person';
