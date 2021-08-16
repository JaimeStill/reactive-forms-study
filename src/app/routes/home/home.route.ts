import { Component } from '@angular/core';
import { Profile } from 'core';

@Component({
  selector: 'home-route',
  templateUrl: 'home.route.html'
})
export class HomeRoute {
  name: string = '';
  profile!: Profile | null;

  updateName = (event: string) => this.name = event;

  updateProfile = (event: Profile | null) => this.profile = event;
}

