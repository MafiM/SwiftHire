import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { PostServiceService } from '../../services/post-service.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  private myForm: FormGroup;
  private message = null;
  private result

  private status = {
    NEW: 'new',
    GRANTED: 'granted',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired'
  }

  constructor(private formBuilder: FormBuilder, private service: PostServiceService, private location: LocationService, private homeService: HomeService) {
    
    this.myForm = formBuilder.group({
      'title': ["", Validators.required],
      'description': ['', Validators.required],
       'category': ['', Validators.required],
      'durationValue': ['', Validators.required],
      'durationUnit': ['', Validators.required],
      'hourlyFee': ['', Validators.required],
      'preferedDate': ['', Validators.required],
      'preferedTime': ['', Validators.required],
      'street': ['', Validators.required],
      'city': ['', Validators.required],
      'region': ['', Validators.required],
      'zipCode': ['', Validators.required],
      'location': [''],
    });

  }
  ngOnInit() {
  }

  registerNewPost() {

    let postData = this.userPostData()
    // this.service.addNewPost(postData).subscribe(data => {
    //   this.message = data;
    //   console.log(this.message)
    // }, err => {
    //   throw err;
    // });
  }

  userPostData() {
    let addData = this.myForm.value;
    console.log('location: '+addData.location)
    return {
        'title': addData.title,
        'description': addData.description,
        'category': addData.category,
        'location': ["String", "String"],
        'duration': { value: addData.durationValue, unit: addData.durationUnit },
        'hourlyFee': addData.hourlyFee,
        'preferredDate': addData.preferedDate,
        'preferredTime': addData.preferedTime,
        'status': this.status.NEW,
        'address': {
          'street': addData.street,
          'city': addData.city,
          'State': addData.region,
          'zipcode': addData.zipCode
        },
        'createdOn': Date.now(),
        'createdBy': this.homeService.getUserName(),
      }

   
  }
}
