import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore, FirestoreModule } from '@angular/fire/firestore';
import { SensorComponent } from './sensor/sensor.component';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { EditInfoComponent } from './home/edit-info/edit-info.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { RegstraionFormComponent } from './regstraion-form/regstraion-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeartBeatComponent } from './home/dashboard/heart-beat/heart-beat.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: 'form', component: RegstraionFormComponent },
  { path: '', component: HomeComponent },
  { path: 'editinfo', component: EditInfoComponent },
  { path: 'sensor', component: SensorComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SensorComponent,
    HomeComponent,
    LoginComponent,
    EditInfoComponent,
    DashboardComponent,
    RegstraionFormComponent,
    HeartBeatComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FirestoreModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
