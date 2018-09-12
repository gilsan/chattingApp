import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabsComponent } from '../components/auth-tabs/auth-tabs.component';
import { LoginComponent } from '../components/login/login.component';
import { StreamsComponent } from '../components/streams/streams.component';


const routes: Routes = [
  { path: '', component: AuthTabsComponent },
// { path: '', component: StreamsComponent },
];

@NgModule({
  imports: [

    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
