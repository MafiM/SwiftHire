import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';


@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {

  private userPosts: any;
    currentPost: {}
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
  viewPost(val){
    this.postService.getPost(val)
        .subscribe(
          data  => { this.currentPost = JSON.parse(data)[0] },
          (err)   =>  console.log(err)  
        )
  }
}
