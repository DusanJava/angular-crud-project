import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers'
  },
  {
    path: 'customers',
    loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    redirectTo: 'customers'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
