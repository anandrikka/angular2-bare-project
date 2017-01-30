import { Component } from '@angular/core';

import { UserService } from './user.provider';
import '../assets/css/app.scss';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private userService: UserService
  ) { }
  
  user = this.userService.getUser();

}