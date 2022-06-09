import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchInitialsComponent } from './match-initials/match-initials.component';
import { FirstInningsComponent } from './first-innings/first-innings.component';
import { SecondInningsComponent } from './second-innings/second-innings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'match-initials', pathMatch:'full'},
  {path: 'match-initials', component:MatchInitialsComponent},
  {path: 'first-innings/:matchName', component:FirstInningsComponent},
  {path: 'second-innings/:matchName', component:SecondInningsComponent},
  {path:'**', component:PageNotFoundComponent}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
