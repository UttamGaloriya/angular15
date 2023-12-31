import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/modules/account/component/login/login.component';
import { SignupComponent } from 'src/app/modules/account/component/signup/signup.component';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/shared/all-interface';
import { ListDialogComponent } from '../list-dialog/list-dialog.component';
import { ConfirmComponent } from '../confirm/confirm.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  adminToken: boolean = false
  users$ = this.userService.allUser();
  userList: UserData[] = []
  search: string = ''
  listEmpty: boolean = false
  tempData: UserData[] = []
  constructor(private userService: UserService, private dialog: MatDialog, private snackBar: SnackbarService) {
    let token = this.userService.getToken
    console.log(token)
    if (token == 'admin-token') {
      this.adminToken = true;
    }
  }
  ngOnInit() {
    this.getAllData()
  }
  getAllData() {
    this.users$.subscribe((res) => { this.userList = res, this.tempData = res });
    this.userList.map((res) => res.isEditable = false)
    this.tempData.map((res) => res.isEditable = false)
  }
  edit(user: UserData) {
    this.userList.map((res) => res.isEditable = false)
    let index = this.userList.findIndex((res) => user.id == res.id);
    let newUser = this.userList[index]
    newUser.isEditable = true
    this.userList[index] = newUser
  }
  delete(user: UserData) {
    this.dialog.open(ConfirmComponent, {
      data: user,
      width: '350px',
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.userService.delete(user.id).subscribe((res) => { console.log(res), this.getAllData(), this.snackBar.showSnackBar('data delete successful', 'ok', 'success') })
      }
    })
  }
  cancel() {
    this.userList.map((res) => res.isEditable = false)
  }
  submit(event: any, id: number, user: UserData) {

    const { isEditable, ...form } = user
    const updatedData = { ...form, ...event.value };
    this.userService.update(updatedData, id).subscribe((res) => { console.log(res) })
    this.getAllData()
  }
  details(user: UserData) {
    this.dialog.open(ListDialogComponent, {
      data: user,
      maxWidth: '50vw',
      width: '100%'
    }).afterClosed().subscribe((res) => {
      if (res) {
        console.log(res)
        setTimeout(() => this.getAllData(), 1000)

      }
    })
  }
  onSearch() {
    let list = this.tempData.filter((res) => {
      const name = res.username;
      this.search = this.search.trim()
      const search = this.search.toLowerCase()
      return name.toLowerCase().includes(search);
    })

    this.userList = list
    if (this.search == null || this.search == '') {
      this.getAllData()
    }

    if (list.length == 0) {
      this.listEmpty = true
    } else {
      this.listEmpty = false
    }

  }
}
