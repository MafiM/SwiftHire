import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class PostServiceService {
  private postUrl = 'http://localhost:4000/api/posts/'
  
  constructor(private http: Http) { }
  
  //return all posts
  retrieveAllPosts(){
    return this.http.get(this.postUrl)
  }

  getUserJobApplications(username) {
    if (!username) 
      throw new Error("No username provided");
    else 
      return this.http.get(`${this.postUrl}'myjobapp/${username}`)
  }

  //My own job post
  getAllUserPosts(username) {
    return this.http.get('http://localhost:4000/api/posts/' + username);
  }

  //My own activities
  getUserActivities(username) {
    return this.http.get('http://localhost:4000/api/posts/activities/' + username);
  }
}
