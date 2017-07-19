import { Injectable} from '@angular/core';
import{Http,Response,RequestOptions,Headers} from '@angular/http'

@Injectable()
export class UserService {

  private userURI='http://localhost:4000/api/users/'
  constructor(private http:Http) { }
// retrive currently loggedIn user
  retirveLoggedInUser(userEmail)
  {
   return this.http.get(this.userURI+userEmail);
  }
//add new user to the database
addNewUser(userData)
{
  this.http.post(this.userURI,userData).subscribe(
    (data)=>{console.log(data);})
}

}
