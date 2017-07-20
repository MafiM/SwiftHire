import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostServiceService } from '../../services/post-service.service';
import { HomeService } from '../../services/home.service';
import { LocationService } from '../../services/location.service';
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

  constructor(
    private postService: PostServiceService, 
    private home:HomeService, 
    private route: Router,
    private location: LocationService) 
  { 
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
    this.home.setCurrentPost(pid)
    this.route.navigateByUrl('home/apply')
  }
}
// <script>
//     console.log('hey')
//   $(document).ready(function(){
//     console.log('hey')
//     let getLoc = function(zip){
//       return new Promise((res, rej)=>{
//                 res(loc.getLocation(zip))
//       })
//     };
//     function getLocation(zipcode) {
//       console.log(zipcode)
//       $.getJSON(`http://gomashup.com/json.php?fds=geo/usa/${zipcode}&jsoncallback=?`, function(result){
//         console.log(result)
//           return (result);
//       });
//       return null;
//     };
//     $('#zip-code').keyup(function(){
//       console.log('current zip: '+$(this).val())
//       if ($(this).val().length >= 5){
//         getLoc($(this).val()).then(data=>{
//           console.log(data)
//         }).catch(err=>console.log(err))
//       }
//     })
  
//   })
    
// </script>