import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {User} from "@web-starter-kit/api-interfaces";
import {Router} from "@angular/router";
import {UserService} from "../../../service/user.service";

@Component({
  // selector: 'crm-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  filterForm: FormGroup;

  userList$: Observable<Array<User>>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      username: [null],
      password: [null]
      });
    this.filterUsers();
  }

  filterUsers(): void {
    const query = this.filterForm.value;
    this.userList$ = this.userService.searchUsers(query);
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filterUsers();
  }

  goToUserForm(userId?: number): void {
    const routePaths = ['users'];
    if (userId) {
      routePaths.push(userId.toString());
    } else {
      routePaths.push('add');
    }
    this.router.navigate(routePaths);
  }
}
