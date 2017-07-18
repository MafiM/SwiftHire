import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';
import  'rxjs/Rx'

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.css']
})
export class MyJobComponent implements OnInit {
  posts
  constructor(private postService: PostServiceService) { }

  ngOnInit() {
    this.postService.getUserJobApplications('n')
      .map( data => data.json() )
      .subscribe(
          data  =>  { this.posts =  (JSON.parse(data));  }, 
          err   =>  { throw (err)});
  }

}
