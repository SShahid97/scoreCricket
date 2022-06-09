import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule} from '@angular/material/button';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MyserviceService } from './services/myservice.service';
import { HttpClientModule } from '@angular/common/http';
import { MyDirectiveDirective } from './myDirective/my-directive.directive';
import { MatchInitialsComponent } from './match-initials/match-initials.component';
import { MatchInitials } from './modals/initialsMatch';
import { FirstInningsComponent } from './first-innings/first-innings.component';
import { SecondInningsComponent } from './second-innings/second-innings.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    MyDirectiveDirective,
    MatchInitialsComponent,
    FirstInningsComponent,
    SecondInningsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule 
  ],
  providers: [MyserviceService,MatchInitials],
  bootstrap: [AppComponent]
})
export class AppModule { }
