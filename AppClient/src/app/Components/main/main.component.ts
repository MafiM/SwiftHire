import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from '../../services/post-service.service';
import { HomeService } from '../../services/home.service';
import  'rxjs/Rx'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  posts : {}
  currentPost: {}
  categories: String[] 
  filter = {
      'category'  :  null,
      'location'  :  null,
      'hourlyFee' :  ''
    }

  constructor(private postService: PostServiceService, private home:HomeService, private route: Router) { 
    this.categories = []
    
  }

  ngOnInit() { 
   this.loadPosts()
   
  }
  loadPosts() {
    this.postService.retrieveAllPosts()
      .subscribe(
          data  =>  { this.posts =  JSON.parse(data); this.getCategories()}, 
          err   =>  { throw (err)});
  }
  getCategories() {
    // this.categories = []
    
    for (let post in this.posts) {
      if (this.posts[post].category && !this.categories.includes(this.posts[post].category))
        this.categories.push(this.posts[post].category)
    }
  }
  categoryChanged(val) {
    this.filter.category = val
     this.postService.getFilteredPosts(this.filter)
      .subscribe(
          data  =>  { this.posts =  JSON.parse(data); this.getCategories();}, 
          err   =>  { throw (err)});
  }
  minFeeChanged(val){
    this.filter.hourlyFee = val;
    this.postService.getFilteredPosts(this.filter)
      .subscribe(
          data  =>  { this.posts =  JSON.parse(data); }, 
          err   =>  { throw (err)});
  }
  viewPost(val){
    this.postService.getPost(val)
        .subscribe(
          data  => { this.currentPost = JSON.parse(data)[0] },
          (err)   =>  console.log(err)  
        )
  }
  apply(pid) {
    console.log(pid)
    this.route.navigateByUrl('home/apply')
  }
}