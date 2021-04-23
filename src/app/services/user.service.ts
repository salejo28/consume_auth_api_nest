import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User, UserLogin } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRegister: User;
  userLogin: UserLogin

  readonly api = 'http://localhost:3000'

  constructor(private http: HttpClient) { 
    this.userRegister = new User();
    this.userLogin = new User();
  }

  login(user: UserLogin) {
    return this.http.post(this.api + '/auth/login', user)
  }

  register(user: User) {
    return this.http.post(this.api + '/auth/register', user)
  }

}
