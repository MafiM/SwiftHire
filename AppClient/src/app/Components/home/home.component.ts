import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs'

import { PostServiceService } from '../../services/post-service.service';

import { AuthService } from '../../services/auth/auth.service';

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
  constructor(private service: PostServiceService, private auth: AuthService) { }

  ngOnInit() {
    this.auth.handleAuthentication();
    this.loggedInUser = JSON.parse(localStorage.getItem('profile'));

    this.auth.loggedIn.subscribe(profile => {
      console.log("Profile fetched here");
      this.loggedInUser = (profile);
      console.log(this.loggedInUser);
    }
    );
  }
}

