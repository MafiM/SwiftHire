import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import  'rxjs/Rx'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posts : any[]

  constructor(private postService: PostServiceService) { }

  ngOnInit() {
    this.postService.retrieveAllPosts()
      .map( data => data.json() )
      .subscribe(
          data  =>  { this.posts =  data;  }, 
          err   =>  { throw (err)});
  }
}