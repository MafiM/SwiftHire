import { Component, OnInit ,Input} from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import { Observable } from 'rxjs'
import { Subscription } from "rxjs/Rx"; 

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
  private loggedInEmail;

  private postData;
  private data;
/**********************
 * For user Profile
 * *******************
 */  private myForm: FormGroup;
  private user={ 
      userName: "",
      password: '',
      email: "",
      address: {
          street: "",
          city: "",
          State: "",
          zipcode: 52557
              },
      picPath: { fileName: "rabin1", ext: "jpg" },
      rating: 5,
      postApplication: ["id1"]
  }
  private subscription: Subscription;

  /**********************
 * For user Profile
 * *********************
 */ 

  constructor(private service: PostServiceService, private auth: AuthService, private homeService: HomeService, private userservice: UserService,private fb: FormBuilder)
   {
     this.myForm = fb.group(
      {
        'userName': ['', Validators.required],
        'password': ['', Validators.required],
        'email': ['', Validators.required],
        'address': '',
        'street': "",
        'city': "",
        'state':"",
        'zipcode': "",
        'picPath': "",
        'rating': 4,
        'postApplication': []
      });

    }


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
      this.loadInitialUserData();
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
    console.log("Register user request being sent!!" + JSON.stringify(newUser));
    this.userservice.addNewUser(newUser).subscribe(
      data => {
      console.log("new user added" + data);
      }, err => {
        console.log("error on adding user");
      throw err;
    });

  }

  isUserAlreadyRegisteredOnDB(email) {
    console.log("validating for email :" + email);
    this.userservice.validateUser(email)
      .subscribe((response) => {    

        if (!response && !response.isCorrectEmail && !response.data ) { 
        
          this.registerAsNewUser(); console.log("User is added to database"); }
        else {console.log("user already found in database"); }
      },
      (err) => console.log("cant validate it")
      );
  }

 loadInitialUserData() {
    console.log("user input here" + this.loggedInUser);
    console.log("user input here" + JSON.parse(this.loggedInUser));
    
    this.userservice.retirveLoggedInUser(JSON.stringify(this.loggedInUser.name))
    .subscribe((result) => {
      console.log((result));
      this.user.userName = result['_body']['userData'].userName;
      this.user.password = result[1].password;
      this.user.email = result[1].email;
      this.user.address = result[1].address;
      this.user.address.street = result[1].address.street;
      this.user.address.city = result[1].address.city;
      this.user.address.State = result[1].address.state;
      this.user.address.zipcode = result[1].address.zipcode;
      this.user.picPath = result[1].picPath;
      this.user.rating = result[1].rating;
      this.user.postApplication = result[1].postApplication;

      //this.user.post = result[1][1].title;

    });
  }
}