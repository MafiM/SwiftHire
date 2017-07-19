import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs'

import { PostServiceService } from '../../services/post-service.service';
import { AuthService } from '../../services/auth/auth.service';
<<<<<<< HEAD
import { UserService } from '../../services/user/user.service';
=======
import { HomeService  } from '../../services/home.service';
>>>>>>> 61488b0745b70eadab0b651e7321e2bcf630e81b

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
<<<<<<< HEAD
  constructor(private service: PostServiceService, private auth: AuthService,private userservice:UserService) { }
=======
  constructor(private service: PostServiceService, private auth: AuthService, private homeService: HomeService) { }
>>>>>>> 61488b0745b70eadab0b651e7321e2bcf630e81b

  ngOnInit() {
    this.auth.handleAuthentication();
    this.loggedInUser = JSON.parse(localStorage.getItem('profile'));
    const uname = this.loggedInUser.name;
    this.homeService.setUserName(uname)
    this.auth.loggedIn.subscribe(profile => {
      console.log("Profile fetched here");
      profile.rabin="Rabin";
      this.loggedInUser = (profile);
      console.log(this.loggedInUser);
      // save user information into DataBase
      this.userservice.addNewUser(this.loggedInUser);
    }
    );
  }
}

