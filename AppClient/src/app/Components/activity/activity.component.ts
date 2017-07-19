import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  private userJobActivity;
  private userPostActivity;

  constructor(private postService: PostServiceService) {
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
}