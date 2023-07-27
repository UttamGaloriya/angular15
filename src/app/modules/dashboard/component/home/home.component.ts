import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  routeShow: boolean = false
  constructor(private userServices: UserService) {

  }

  ngOnInit() {
    this.userTypeCheck()
  }
  logout() {
    this.userServices.removeToken()
  }

  userTypeCheck() {
    let token = this.userServices.getToken
    console.log(token)
    if (token == 'admin-token') {
      this.routeShow = true;
    }
    else {
      this.routeShow = false;
    }
  }
}
