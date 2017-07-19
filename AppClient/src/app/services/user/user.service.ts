import { Injectable} from '@angular/core';
import{Http,Response,RequestOptions,Headers} from '@angular/http';

@Injectable()
export class UserService {

  private userURI='http://localhost:4000/api/users/'
  constructor(private http:Http) { }

  //Validate Logged in user
  validateUser(userEmail)
  {
     this.http.post(this.userURI+"validate/",userEmail)
     .map((result)=>{
       console.log("validate result is :"+result); 
       return result; });
    return false;
  }
// retrive currently loggedIn user
  retirveLoggedInUser(userEmail)
  {
   return this.http.get(this.userURI+userEmail);
  }

  //add new user 
  addNewUser(body)
  {
    return this.http.post(this.userURI + 'add',body).map((res:Response) =>res.json());
  }

}
