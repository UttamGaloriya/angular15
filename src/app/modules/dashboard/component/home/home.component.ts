import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/shared/all-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  routeShow: boolean = false;
  user!: UserData
  constructor(private userServices: UserService) {

  }

  ngOnInit() {
    this.userTypeCheck()
    this.userServices.getUserProfile().subscribe((res) => { console.log(res + "res"), this.user = res })
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
