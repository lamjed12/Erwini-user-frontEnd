import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './user/shared/navbar/navbar.component';
import { SidebarComponent } from './user/shared/sidebar/sidebar.component';
import { DashbordComponent } from './user/pages/dashbord/dashbord.component';
import { vannesComponent } from './user/pages/vannes/vannes.component';
import { HistoriquesComponent } from './user/pages/historiques/historiques.component';
import { ProfilComponent } from './user/shared/profil/profil.component';
import { LoginComponent } from './user/pages/login/login.component';
import { MapComponent } from './user/pages/map/map.component';
import { HomeComponent } from './home/home.component'
import { moteursComponent } from './user/pages/moteurs/moteurs.component';
import { NotificationComponent } from './user/pages/notification/notification.component';
import { AuthGuardService } from './services/Auth/auth-guard.service';

//canActivate: [AuthGuardService],
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component:  HomeComponent},
  { path: 'navbarComponent', component: NavbarComponent },
  { path: 'sidebarComponent', component: SidebarComponent },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'moteur', component: moteursComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'vanne', component: vannesComponent },
  { path: 'historique', component: HistoriquesComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'map', component: MapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
