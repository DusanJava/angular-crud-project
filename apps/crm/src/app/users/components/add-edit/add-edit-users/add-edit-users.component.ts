import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {MessageService} from "primeng/api";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Params} from "@angular/router";
import {User} from "@web-starter-kit/api-interfaces";

@Component({
  selector: 'crm-add-edit-users',
  templateUrl: './add-edit-users.component.html',
  styleUrls: ['./add-edit-users.component.scss']
})
export class AddEditUsersComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          const userId = +params['id'];
          this.userService.getUserById(userId)
            .subscribe(user => this.populateUser(user));
        });
    this.createForm();
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Invalid form',
        detail: 'Please fill all required fields before submitting form.'
      });
      return;
    }
    const formValue = this.userForm.value;
    this.userService.saveUser(formValue)
      .subscribe(
        res => {
          this.userForm.reset();
          this.goBackToList();
        },
        error => console.log(error)
      );
  }

  createForm(): void {
    this.userForm = this.fb.group({
      id: [null],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  populateUser(user: User) {
    let formUser = {} as User;

    if (user) {
      formUser = {
        ...user
      } as User;
    }

    if (this.userForm) {
      this.userForm.patchValue(formUser);
    }
  }

  goBackToList() {
    this.location.back();
  }

}
