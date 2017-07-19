import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import 'rxjs/Rx';

import { HomeService  } from '../services/home.service';

@Injectable()
export class PostServiceService {
  private postUrl = 'http://localhost:4000/api/posts/';
  private activityJobUrl = "currentjob/";
  private activityPostUrl = "currentpost/";
  

  constructor(private http: Http, private homeService: HomeService) { }
  
  //return all posts
  retrieveAllPosts(){ 
    return this.http.get(this.postUrl).map(res =>res.json())
  }

  getUserJobApplications() {
    if (!this.homeService.getUserName()) 
      throw new Error("No username provided");
    else 
      return this.http.get(`${this.postUrl}'myjobapp/${this.homeService.getUserName()}`)
  }

  //user post Activities
  getUserPostsActivities(username) {
    if (username == null) {
     throw new Error("no name");
    }
    return this.http.post(this.postUrl + this.activityPostUrl,username).map((res: Response) => res.json());
  }

  //user job Activities activities
  getUserJobActivities(username) {
    if (username == null) {
      throw new Error("no name");
    }
    return this.http.post(this.postUrl + this.activityJobUrl,username).map((res: Response) => res.json());
  }
  //add new post 
  addNewPost(body){
    return this.http.post(this.postUrl + 'add',body).map((res:Response) =>res.json());
  }
}
