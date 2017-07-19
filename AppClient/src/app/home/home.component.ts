import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs'

import { PostServiceService } from '../services/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private posts;

  private postData;

  constructor(private service: PostServiceService) {
  
  }

  ngOnInit() {

    this.getAllPosts();
  }

  getAllPosts() {
    this.service.retrieveAllPosts().subscribe(data => {
      this.postData = data;
      console.log(this.postData)
    }, err => {
      throw err;
    });

  }
}

