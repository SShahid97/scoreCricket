import { Component,Inject,OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyserviceService } from './services/myservice.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showMatchInit:boolean=false;
  showFirstInn:boolean=false;
  title = 'DigiScoreBook';

  constructor(@Inject(DOCUMENT) private document: any,private service: MyserviceService ){
    
  }

  elem;
  ngOnInit(){
    this.elem = document.documentElement;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }
  toggleNewMatchLink(){
    // this.openFullscreen();
    this.service.showMatchInitForm = true;
    this.showMatchInit=true;
  }

  toggleFirstInning(){
    // this.service.showFirstInnings = true;
  }
 
}
