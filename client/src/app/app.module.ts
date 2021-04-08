import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DndDirective } from './components/file-upload/dnd.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/alerts/alerts.component';
import { ServerManagementComponent } from './pages/server-management/server-management.component';
import { PublishComponent } from './pages/publish/publish.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ImageManagementComponent } from './pages/image-management/image-management.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { EditPostComponent } from './pages/browse/edit/edit.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';
import { EditUserComponent } from './pages/users/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    ErrorComponent,
    ServerManagementComponent,
    PublishComponent,
    SettingsComponent,
    ImageManagementComponent,
    BrowseComponent,
    DndDirective,
    EditPostComponent,
    FileUploadComponent,
    DashboardComponent,
    UsersComponent,
    EditUserFormComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatRippleModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
 