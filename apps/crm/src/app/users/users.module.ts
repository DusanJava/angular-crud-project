import { NgModule } from '@angular/core';
import { AddEditUsersComponent } from './components/add-edit/add-edit-users/add-edit-users.component';
import { UsersListComponent } from './components/list/users-list/users-list.component';
import { Route, RouterModule } from "@angular/router";
import { UiSharedModule } from "../ui-shared/ui-shared.module";
import { UserService } from "./service/user.service";

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'list'
  },
  {
    path: 'add',
    component: AddEditUsersComponent
  },
  {
    path: 'list',
    component: UsersListComponent
  },
  {
    path: ':id',
    component: AddEditUsersComponent
  }
];

@NgModule({
  declarations: [
    AddEditUsersComponent,
    UsersListComponent
  ],
  imports: [
    UiSharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserService
  ]
})
export class UsersModule { }
