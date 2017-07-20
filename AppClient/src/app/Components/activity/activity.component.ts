import { Component, OnInit } from '@angular/core';
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
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private userJobActivity: {};
  private userPostActivity: {};
  private pid;
  private myForm: FormGroup;
  private message = null;
  currentPost: {}

  constructor(private formBuilder: FormBuilder, private postService: PostServiceService,

    private homeService: HomeService) {

    this.myForm = this.formBuilder.group({
      'comment': ["", Validators.required],
      'rating': ['', Validators.required]
    })
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
      this.userPostActivity = JSON.parse(data);
      console.log(this.userPostActivity)
    }, err => {
      throw err;
    });
  }

  finish(val) {
    this.pid = val
    let body = this.commentBody();
    this.postService.changeStatus(this.pid).subscribe(data => {
      this.message = data;
      console.log(this.message)
    }, err => {
      throw err;
    });

  }
  

  commentBody() {
    let commentData = this.myForm;
    let data = {
      '_id': this.pid,
      "comments": {
        'commentBy': this.homeService.getUserName(),
        'text': "Comment Data ",//this.myForm.comment,
        'timeStamp': Date.now(),

      }
    }
    return data;
  }

  addComment() {
    let body = this.commentBody();
    console.log(body)
    this.postService.addComment(body).subscribe(data => {
      this.message = data;
      console.log(this.message)
    }, err => {
      throw err;
    });
  }
  viewPost(val){
    this.postService.getPost(val)
        .subscribe(
          data  => { this.currentPost = JSON.parse(data)[0] },
          (err)   =>  console.log(err)  
        )
  }
}