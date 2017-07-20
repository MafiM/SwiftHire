import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, Request } from '@angular/http'
import 'rxjs/Rx';

import { HomeService } from '../services/home.service';

@Injectable()
export class PostServiceService {
  private postUrl = 'http://localhost:4000/api/posts/';
  private activityJobUrl = "currentjob/";
  private activityPostUrl = "currentpost/";

  private bodyData: {}
  constructor(private http: Http, private homeService: HomeService) {
    
  }
  //return all posts
  retrieveAllPosts() {
    return this.http.get(this.postUrl).map(res => res.json())
  }

  getFilteredPosts(filter) {
     const filterBy = []
     if (filter.category) { filterBy.push({'category':filter.category}) }
     if (filter.hourlyFee) { filterBy.push({'hourlyFee':{'$gte':filter.hourlyFee}}) }
     //if (filter.category) { filterBy.push({'category':filter.category}) }
     //console.log(filterBy)
    return this.http.post(`${this.postUrl}filter`, filterBy).map(res => res.json())
  }

  //get user job applications
  getUserJobApplications() {
    if (!this.homeService.getUserName())
      throw new Error("No username provided");
    else 
      return this.http.post(`${this.postUrl}myjobapp/`, this.homeService.getUserName())
  }

  //user post Activities
  getUserPostActivities() {
    this.bodyData = { "userName": this.homeService.getUserName() }
    console.log(this.bodyData)
    return this.http.post(this.postUrl + this.activityPostUrl, this.bodyData).map((res: Response) => res.json());
  }

  //user job Activities activities
  getUserJobActivities() {
    this.bodyData = { "userName": this.homeService.getUserName() }
    return this.http.post(`${this.postUrl}currentjob`, this.bodyData).map((res: Response) => res.json());
  }

  //get all user posts
  getAllUserPosts() {
    this.bodyData = { "userName": this.homeService.getUserName() }
    console.log(this.bodyData)
    return this.http.post(`${this.postUrl}mypost`, this.bodyData).map((res: Response) => res.json());
  }

  //add new post 
  addNewPost(body) {
    return this.http.post(this.postUrl + 'add', body).map((res: Response) => res.json());
  }
  getPost(id){
    return this.http.post(this.postUrl + 'getPost', {'id':id})
          .map(res=> res.json() )
  }
  applyPost(body) {
    console.log(body)
    
  }
}
