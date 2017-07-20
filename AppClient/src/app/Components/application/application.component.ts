import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl,  Validators,  FormBuilder,  FormArray} from "@angular/forms";
import { PostServiceService } from '../../services/post-service.service';
import { HomeService } from '../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  private applyForm: FormGroup;
  private name: String = '';
  private about: String = ''
  private exp: String = ''
  private success: boolean;
  
  constructor(private formBuilder: FormBuilder, 
      private service: PostServiceService,
      private home:HomeService,      
      private route: Router) {
    this.applyForm = formBuilder.group({
      'name': ['', Validators.required],
      'about': '',
      'exp': ['', Validators.required],
    });    
  }
  ngOnInit() {
    this.success = false;
  }
  applyPost(app) {
      let applicationDetails= {
          fullName: app.name,
          about: app.about,
          exp:app.exp,
          createdOn: Date.now()
      }

      this.service.applyPost(this.home.getCurrentPost,app)
        .subscribe(
          () => {
            console.log('data');
            //this.success = true
            //setTimeout(()=>this.route.navigateByUrl('home'),0)
          },
          err => console.log(err));
  }
  cancel(){
    this.route.navigateByUrl('home')
  }
}
