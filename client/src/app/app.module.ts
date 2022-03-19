import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DndDirective } from './components/file-upload/dnd.directive';
import { ErrorComponent } from './components/alerts/alerts.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { EditUserFormComponent } from './components/edit-user-form/edit-user-form.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { BrowseComponent } from './pages/browse/browse.component';
import { PublishComponent } from './pages/publish/publish.component';
import { EditUserComponent } from './pages/users/edit/edit.component';
import { EditPostComponent } from './pages/browse/edit/edit.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ImageManagementComponent } from './pages/image-management/image-management.component';
import { ServerManagementComponent } from './pages/server-management/server-management.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

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
		EditUserComponent,
		ToolbarComponent,
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
		MatTabsModule,
		NgxEchartsModule.forRoot({
			echarts: () => import('echarts'),
		}),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
