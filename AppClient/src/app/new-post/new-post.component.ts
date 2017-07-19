import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { Observable } from "rxjs/Rx";
import { PostServiceService } from '../services/post-service.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  private myForm: FormGroup;
  private message = null;

  constructor(private formBuilder: FormBuilder, private service: PostServiceService) {

    this.myForm = formBuilder.group({
      'title': ["", Validators.required],
      'description': ['', Validators.required],
      'durationValue': ['', Validators.required],
      'durationUnit': ['', Validators.required],
      'preferedDate': ['', Validators.required],
      'preferedTime': ['', Validators.required],
      'address': ['', Validators.required],
      'city': ['', Validators.required],
      'region': ['', Validators.required],
      'postalCode': ['', Validators.required],
    });

  }
  ngOnInit() {
  }

  registerNewPost() {
    // console.log(this.myForm.value)
    this.service.addNewPost(this.myForm.value).subscribe(data => {
      this.message = data;
      console.log(this.message)
    }, err => {
      throw err;
    });
  }

}
