import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../services/post-service.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  constructor(private service:PostServiceService) { 
    
  }

  ngOnInit() {
  }

  getAllActivities(){
    
  }

  
}
