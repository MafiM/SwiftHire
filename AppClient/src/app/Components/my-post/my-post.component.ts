import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {

  private userPosts: any;
  constructor(private postService: PostServiceService) { }

  ngOnInit() {
    this.getAllPosts();
  }
  getAllPosts() {
    this.postService.getAllUserPosts().subscribe(data => {
      console.log(data);
      this.userPosts = JSON.parse(data);
    }, err => {
      throw err;
    });
  }
}
