import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private userJobActivity;
  private userPostActivity;

  constructor(private service: PostServiceService) {

  }

  ngOnInit() {
    this.getAllJobActivities();
    this.getAllPostActivities();
  }

  getAllJobActivities() {
    this.service.getUserJobActivities(name).subscribe(data => {
      this.userJobActivity = JSON.parse(data);
      console.log(this.userJobActivity)
    }, err => {
      throw err;
    });

  }
  getAllPostActivities() {
    this.service.getUserPostsActivities(name).subscribe(data => {
      this.userPostActivity = JSON.parse(data);
      console.log(this.userJobActivity)
    }, err => {
      throw err;
    });
  }
}
