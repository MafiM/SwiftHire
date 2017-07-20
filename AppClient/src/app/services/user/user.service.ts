import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class UserService {

  private userURI = 'http://localhost:4000/api/users/'
  constructor(private http: Http) { }

  //Validate Logged in user
  validateUser(userEmail) {
    console.log("email search on service :" +   userEmail );
    return this.http.get(`${this.userURI}validate/${userEmail}`)
      .map((res: Response) => res.json());
  }

  // retrive currently loggedIn user
  retirveLoggedInUser(userEmail)
  {
    return this.http.get(`${this.userURI}${userEmail}`)
      .map((res: Response) => res.json());
  }


  //retrive all users
  retirveAllUsers() {
    return this.http.get(this.userURI).map(res=>res.json());
  }

  //add new user 
  addNewUser(userData) {
    console.log("Add request sent :" + userData)
    return this.http.post(this.userURI + 'add', userData).map((res: Response) => res.json());
  }

  updateUSer(user) {
    console.log("Add request sent :" + user)
    return this.http.post(this.userURI + 'update', user).map((res: Response) => res.json());

  }


}
