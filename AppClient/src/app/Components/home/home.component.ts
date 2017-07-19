import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs'

import { PostServiceService } from '../../services/post-service.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private posts;
  private loggedInUser;

  private postData;
  private data;

  constructor(private service: PostServiceService, private auth: AuthService, private homeService: HomeService, private userservice: UserService) { }

  ngOnInit() {
    this.auth.handleAuthentication();

    this.loggedInUser = JSON.parse(localStorage.getItem('profile'));


    this.auth.loggedIn.subscribe(profile => {
      console.log("User Logged in : Fetching profile here :");
      this.loggedInUser = (profile);

      // Access properties of loggedInUser from here
      const uname = this.loggedInUser.name;
      this.homeService.setUserName(uname);

      console.log(this.loggedInUser);
      //this.registerNewuser();
      this.isUserAlreadyRegisteredOnDB(this.loggedInUser.name);
    }
    );


  }

  registerAsNewUser() {
    //creating new user Profile for register
    var newUser = {
      userName: this.loggedInUser.name,
      password: 'password',
      email: this.loggedInUser.email,
      address: {
        street: "N 4th street",
        city: "Fairfield",
        State: "IA",
        zipcode: 52557
      },
      picPath: { fileName: "rabin1", ext: "jpg" },
      rating: 5,
      postApplication: ["id1", "id2"]
    };
    console.log("Register user request being sent!!" + newUser);
    this.userservice.addNewUser(newUser).subscribe(data => {
      console.log("new user added" + data);
    }, err => {
      throw err;
    });

  }

  isUserAlreadyRegisteredOnDB(email) {
    console.log("validating for email :" + email);
    this.userservice.validateUser(email)
      .subscribe((response) => {

        console.log((response));
        if (response.isCorrectEmail) { console.log("user already found in database"); }
        else { this.registerAsNewUser(); console.log("User is added to database"); }
      },
      (err) => console.log("cant validate it")
      );
  }


}