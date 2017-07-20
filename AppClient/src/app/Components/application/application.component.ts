import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl,  Validators,  FormBuilder,  FormArray} from "@angular/forms";
import { PostServiceService } from '../../services/post-service.service';

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
  
  constructor(private formBuilder: FormBuilder, private service: PostServiceService) {
    this.applyForm = formBuilder.group({
      'name': [null, Validators.required],
      'about': [null],
      'exp': [null, Validators.required],
    });
  }
  ngOnInit() {
  }
  applyPost(app) {
    console.log(app)
    console.log(this.applyForm.value)
    this.service.applyPost(this.applyForm.value)//.subscribe(data => {
    //   this.message = data;
    //   console.log(this.message)
    // }, err => {
    //   throw err;
    // });
  }
}
