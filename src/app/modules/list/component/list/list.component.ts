import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserData } from 'src/app/shared/all-interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  users$ = this.userService.allUser();
  userList: UserData[] = []
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.getAllData()
  }
  getAllData() {
    this.users$.subscribe((res) => { this.userList = res });
    this.userList.map((res) => res.isEditable = false)
  }
  edit(user: UserData) {
    this.userList.map((res) => res.isEditable = false)
    let index = this.userList.findIndex((res) => user.id == res.id);
    let newUser = this.userList[index]
    newUser.isEditable = true
    this.userList[index] = newUser
  }
  delete(user: UserData) {

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
}
