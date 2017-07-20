import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs/Rx";
import { UserService } from '../../services/user/user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() private loggedInEmail: any;

  private myForm: FormGroup;
  private user = {
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
  constructor(private fb: FormBuilder, private userservice: UserService) {


    this.myForm = fb.group(
      {
        'userName': ['', Validators.required],
        'password': ['', Validators.required],
        'email': ['', Validators.required],
        'address': '',
        'street': "",
        'city': "",
        'state': "",
        'zipcode': "",
        'picPath': "",
        'rating': 4,
        'postApplication': []
      });

    this.loadInitialUserData();

  }
  loadInitialUserData() {
    console.log("user input here" + this.loggedInEmail);
    let resultDataProvider = this.userservice.retirveLoggedInUser(this.loggedInEmail);
    resultDataProvider.subscribe((result) => {
      console.log((result));
      this.user.userName = result[1].userName;
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
  onsubmit(): void {
    console.log(this.user);
    this.userservice.addNewUser(this.user);
  }
  ngOndestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}

