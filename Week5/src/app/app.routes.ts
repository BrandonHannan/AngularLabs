import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Login } from '../login/login';
import { Account } from '../account/account';
import { App } from './app';
import { HomeComponent } from './home-component/home-component';
import { Profile } from './profile/profile';

export const routes: Routes = [{path: 'login', component: Login}, 
                               {path: 'account', component: Account},
                               {path: '', component: HomeComponent},
                               {path: 'profile', component: Profile}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
