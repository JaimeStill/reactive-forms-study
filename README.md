# Reactive Forms with Session Storage

[![reactive-forms-session-state](https://user-images.githubusercontent.com/14102723/129758896-6a8af5a2-7e9b-4e95-9478-6da7220c5ac0.gif)](https://user-images.githubusercontent.com/14102723/129758896-6a8af5a2-7e9b-4e95-9478-6da7220c5ac0.gif)

Integrated the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) with [Angular Reactive Forms](https://angular.io/guide/forms-overview) with the intent of extending the form experience with cached inputs. A unique storage item is generated based on the context of the form (*create* or *update* an `Executive` or `Associate`).

## Relevant Files

> Aspects of this app could have been componetized / optimized better, but the intent was to focus on the storage state + Reactive Forms interactions vs. a fully fleshed out app.

* [`StorageState`](./projects/core/src/lib/models/storage-state.ts)
* [`Associate`](./projects/core/src/lib/models/associate.ts)
  * Particularly the `AssociateForm` function.
* [`Executive`](./projects/core/src/lib/models/executive.ts)
  * Particularly the `ExecutiveForm` function.
* [`AppService`](./projects/core/src/lib/services/app.service.ts)
  * Note the self-contained `Database` class with mock data and interaction functions.
* [`AssociateDialog`](./projects/core/src/lib/dialogs/person/associate.dialog.ts)
  * [Template](./projects/core/src/lib/dialogs/person/associate.dialog.html)
* [`ExecutiveDialog`](./projects/core/src/lib/dialogs/person/executive.dialog.ts)
  * [Template](./projects/core/src/lib/dialogs/person/executive.dialog.html)
* [`HomeRoute`](./src/app/routes/home/home.route.ts)
  * [Template](./src/app/routes/home/home.route.html)
