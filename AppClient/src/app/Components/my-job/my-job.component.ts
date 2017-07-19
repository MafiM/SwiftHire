import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
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
    this.postService.getUserJobApplications()
      .map( data => data.json() )
      .subscribe(
          data  =>  { if(data.status) this.posts =  (JSON.parse(data));  }, 
          err   =>  { throw (err)});
  }

}
