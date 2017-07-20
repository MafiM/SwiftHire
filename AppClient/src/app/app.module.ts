import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ActivityComponent } from './components/activity/activity.component';
import { MyJobComponent } from './components/my-job/my-job.component';
import { MyPostComponent } from './components/my-post/my-post.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { MainComponent } from './components/main/main.component';
import { LoginGuard } from "./services/login.guard";
import { ApplicationComponent } from './components/application/application.component';

//services
import { AuthService  } from './services/auth/auth.service';
import { PostServiceService } from './services/post-service.service';
import { UserService } from './services/user/user.service';

import { HomeService  } from './services/home.service'
import { LocationService  } from './services/location.service';

import { UserProfileComponent } from './Components/user-profile/user-profile.component';



const APP_ROUTES = [
  {path: 'login', component: LoginComponent},
  {
    path: 'home', 
    component: HomeComponent, 
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent},
      { path: 'activities', component: ActivityComponent  },
      { path: 'myJob', component: MyJobComponent  },
      { path: 'myPost', component: MyPostComponent  },
      { path: 'notification', component: NotificationComponent  },
      { path: 'apply', component: ApplicationComponent},

      { path: 'newPost', component: NewPostComponent  },      
      { path: 'profile', component: UserProfileComponent,CanActivate:[LoginGuard]  },
    
    ],CanActivate:[LoginGuard]
  },
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ActivityComponent,
    MyJobComponent,
    MyPostComponent,
    NotificationComponent,
    NewPostComponent,
    MainComponent,
    ApplicationComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PostServiceService,
    AuthService,
    LoginGuard,
    UserService,
    HomeService,
    LocationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
