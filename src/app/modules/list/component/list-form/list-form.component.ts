import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/all-interface';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent {
  hide: boolean = true
  form!: FormGroup;

  @Output() newSubmitEvent = new EventEmitter<unknown>();
  @Output() newCancelEvent = new EventEmitter<unknown>();
  @Input() user: User = {
    username: '',
    password: '',
  }

  constructor(private fb: FormBuilder, private userServices: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]]
    });
  }

  //user name and input value ---> same button auto disable
  get editChange() {
    if (this.user.password != this.form.value.name || this.user.username != this.form.value.username) {
      return false
    } else {
      return true
    }
  }
  submit() {
    this.newSubmitEvent.emit(this.form)
  }

  cancel() {
    this.newCancelEvent.emit()
  }

}
