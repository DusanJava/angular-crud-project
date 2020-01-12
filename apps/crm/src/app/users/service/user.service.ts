import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "apps/crm/src/environments/environment";
import {Observable} from "rxjs";
import {User} from "@web-starter-kit/api-interfaces";

@Injectable()
export class UserService {

  constructor(
    private httpClient: HttpClient) {}

  private readonly baseUrl = `${environment.apiUrl}/users`;

  searchUsers(query: any = {}): Observable<Array<User>> {
    const params = [];
    Object.keys(query)
      .filter(key => query[key])
      .forEach(key => params.push(`${key}=${query[key]}`));

    const url = `${this.baseUrl}/search?${params.join('&')}`;

    return this.httpClient.get<Array<User>>(url);
  }

  saveUser(newUser: User): Observable<User> {
    let method = 'POST'.toLowerCase();
    if (newUser.id) {
      method = 'PUT'.toLowerCase();
    }
    return this.httpClient[method]<User>(this.baseUrl, newUser);
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<User>(url);
  }


}




