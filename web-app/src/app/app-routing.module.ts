import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { MovieComponent } from './components/movie/movie.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  {
    path:'',
    component:LoginComponent,
  },

 
  
  { canActivate:[AuthGuard],
    path:'home',
    component:IndexComponent,
   
    children:[
      { path:'dashboard',
      component:DashboardComponent
    },
    { path:'user',
      component:UserComponent
    },
    { path:'movie',
      component:MovieComponent
    }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  
  ,
  exports: [RouterModule]
})
export class AppRoutingModule { }
