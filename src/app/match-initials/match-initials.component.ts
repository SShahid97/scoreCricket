import { Component, OnInit, Inject } from '@angular/core';
import { MatchInitials } from '../modals/initialsMatch';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MyserviceService } from '../services/myservice.service';
import { formatDate, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-match-initials',
  templateUrl: './match-initials.component.html',
  styleUrls: ['./match-initials.component.css']
})
export class MatchInitialsComponent implements OnInit {
  showMatchInitFormlocal:boolean;
  showInvalidOversMsg: boolean=false;
  rand: number;
  randomNum: string;
  elem;
  showInvalidOversMsg2: boolean;
  showInvalidOversMsg3: boolean;
  showInvalidOversMsg4: boolean;
  showInvalidOversMsg5: boolean;
  showInvalidOversMsg6: boolean;
  showInvalidOversMsg7: boolean;
  // today= new Date();
  // todaysDataTime = '';
  constructor(private matchinitial: MatchInitials, 
              private router:Router,
              private service:MyserviceService,
              @Inject(DOCUMENT) private document: any) { 
    // this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss', 'en-US', '+0530');
  }
  matchInit={
    matchName:'',
    overs:0,
    teamOne:'',
    teamSecond:'',
    tossWonBy:'',
    choseTo:''
  };
 
  TeamOne:string="";
  TeamTwo:string="";
  matchName:string="";
  inputOvers;
  allMatches;
  ngOnInit(): void {
    this.rand=Math.floor((Math.random() * 10000) + 1);
    this.randomNum=JSON.stringify(this.rand);
    this.showMatchInitFormlocal = this.service.showMatchInitForm;
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


  onSubmit(form:NgForm){
    this.matchinitial.matchInitialData.matchName=(form.value.matchName+this.randomNum);
    this.matchinitial.matchInitialData.overs=form.value.overs;
    this.matchinitial.matchInitialData.teamOne=form.value.teamOne;
    this.matchinitial.matchInitialData.teamSecond=form.value.teamSecond;
    this.matchinitial.matchInitialData.tossWinningTeam=form.value.tossWinningTeam;
    this.matchinitial.matchInitialData.choseTo=form.value.choseTo;
    
    this.matchInit.matchName = (form.value.matchName+this.randomNum);
    this.matchInit.overs = form.value.overs;
    this.matchInit.teamOne =form.value.teamOne;
    this.matchInit.teamSecond = form.value.teamSecond;
    this.matchInit.tossWonBy = form.value.tossWinningTeam;
    this.matchInit.choseTo = form.value.choseTo;
    // console.log((this.matchInit.matchName+this.randomNum));
    
    this.service.addMatchInit(this.matchInit,this.matchInit.matchName).subscribe(
      (response)=>{
        this.router.navigate(['/first-innings', this.matchInit.matchName]);
        console.log(response)},
      (err)=>{console.log(err)}
    );
    
  }

  checkOvers(){
    if(this.inputOvers<1 ){
      this.showInvalidOversMsg=true;
    }else{
      this.showInvalidOversMsg=false;
    }
  }

  checkTeamOne(){
    if(this.TeamOne.length<1){
      return;
    }
    var RegEx = /^[a-z0-9 ]+$/i; 
    var valid = RegEx.test(this.TeamOne);
    if(valid){
      this.showInvalidOversMsg4=false;
      if(this.TeamOne.length<3 ){
        this.showInvalidOversMsg2=true;
      }else{
        this.showInvalidOversMsg2=false;
      }
    }else{
      this.showInvalidOversMsg4=true;
    }
  }

  checkTeamTwo(){
    if(this.TeamTwo.length<1){
      return;
    }
    var RegEx = /^[a-z0-9 ]+$/i; 
    var valid = RegEx.test(this.TeamTwo);
    if(valid){
      this.showInvalidOversMsg5=false;
      if(this.TeamTwo.length<3 ){
        this.showInvalidOversMsg3=true;
      }else{
        this.showInvalidOversMsg3=false;
      }
    }else{
      this.showInvalidOversMsg5=true;
    }
  }

  checkMatchName(){
    if(this.matchName.length<1){
      return;
    }
    var RegEx = /^[a-z0-9 ]+$/i; 
    var valid = RegEx.test(this.matchName);
    if(valid){
      this.showInvalidOversMsg7=false;
      if(this.matchName.length<3 ){
        this.showInvalidOversMsg6=true;
      }else{
        this.showInvalidOversMsg6=false;
      }
    }else{
      this.showInvalidOversMsg7=true;
    }
  }

  MatchInitForm(){
    // this.openFullscreen();
    this.service.showMatchInitForm=true;
    this.showMatchInitFormlocal=true;
  }
}
