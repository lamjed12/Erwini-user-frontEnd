import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import {ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './user/shared/navbar/navbar.component';
import { SidebarComponent } from './user/shared/sidebar/sidebar.component';
import { DashbordComponent } from './user/pages/dashbord/dashbord.component';


import { HistoriquesComponent } from './user/pages/historiques/historiques.component';
import { ProfilComponent } from './user/shared/profil/profil.component';
import { LoginComponent } from './user/pages/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule }   from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { moteursComponent } from './user/pages/moteurs/moteurs.component';
import { vannesComponent } from './user/pages/vannes/vannes.component';
import { NotificationComponent } from './user/pages/notification/notification.component';
import { MapComponent } from './user/pages/map/map.component';
import { AgmCoreModule } from '@agm/core';
// import { GoogleMapsModule } from '@angular/google-maps';

// import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AgmDrawingModule } from '@agm/drawing';

// import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashbordComponent,
    moteursComponent,
    vannesComponent,
    ProfilComponent,
    LoginComponent,
    HomeComponent,
    HistoriquesComponent,
    NotificationComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // MatSlideToggleModule,
    BrowserModule,
    // GoogleMapsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyADiM8Fxg6qgy2yef7CURfQ_bh2b4K5O2M',
      libraries: ['drawing']
    }),
    AgmDrawingModule

    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
