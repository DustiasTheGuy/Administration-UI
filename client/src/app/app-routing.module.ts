import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanactivateGuard } from './guards/canactivate.guard';
import { CantactivateGuard } from './guards/cantactivate.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ServerManagementComponent } from './pages/server-management/server-management.component';
import { PublishComponent } from './pages/publish/publish.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ImageManagementComponent } from './pages/image-management/image-management.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { EditComponent } from './pages/browse/edit/edit.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'sign-up', 
    component: RegisterComponent, 
    canActivate: [ CantactivateGuard ] 
  },
  { 
    path: 'sign-in', 
    component: LoginComponent, 
    canActivate: [ CantactivateGuard ] 
  },
  {
    path: 'server-management',
    component: ServerManagementComponent,
    canActivate: [ CanactivateGuard ]
  },
  {
    path: 'publish',
    component: PublishComponent,
    canActivate: [ CanactivateGuard ]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [ CanactivateGuard ]
  },
  {
    path: 'image-management',
    component: ImageManagementComponent,
    canActivate: [ CanactivateGuard ]
  },
  {
    path: 'browse',
    component: BrowseComponent,
    canActivate: [ CanactivateGuard ]
  },
  { 
    path: 'browse/edit',
    component: EditComponent,
    canActivate: [ CanactivateGuard ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ CanactivateGuard ]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [ CanactivateGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
