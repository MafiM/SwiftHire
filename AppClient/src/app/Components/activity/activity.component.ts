import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private userJobActivity=null;
  private userPostActivity=null;
  private pid;
  private myForm: FormGroup;

  constructor(private postService: PostServiceService,private formBuilder: FormBuilder, private homeService: HomeService) {

    this.myForm = formBuilder.group({
      'comment': ["", Validators.required],
      'rating': ["", Validators.required],
    });
  }

  ngOnInit() {
    this.getAllJobActivities();
    this.getAllPostActivities();
  }

  getAllJobActivities() {
      this.postService.getUserJobActivities().subscribe(data => {
        console.log(data)
        this.userJobActivity = JSON.parse(data);
        console.log(this.userPostActivity)
      }, err => {
        throw err;
      });

  }
  getAllPostActivities() {
    this.postService.getUserPostActivities().subscribe(data => {
        console.log(data);
        this.userPostActivity =JSON.parse(data);
        console.log(this.userPostActivity)
    }, err => {
      throw err;
    });
  }
  finish(val) {
    this.pid=val;
  }

    addComment() {
      let commentData = this.myForm;
      return {
        'commentBy': this.homeService.getUserName(),
        //'text': commentData.rating,
        'timeStamp': Date.now(),
        'pid':this.pid
      }
    }
}