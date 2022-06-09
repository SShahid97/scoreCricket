import { Component, OnInit, DoCheck, OnChanges, ViewChild } from '@angular/core';
import { Router,RouterModule, ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { MyserviceService } from '../services/myservice.service';
import { MatchInitials } from '../modals/initialsMatch';
import { formatDate } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-first-innings',
  templateUrl: './first-innings.component.html',
  styleUrls: ['./first-innings.component.css']
})
export class FirstInningsComponent implements OnInit {
  selectedOption:string;
  battingChosenby;
  bowlingChosenby;
  showFirstInning:boolean;

  totalBatsmen:number=0;
  totalBowlers:number=0;
  isAddBatsman:boolean=false;
  isAddBowler:boolean=false;
  overBowled:boolean=false;
  isDisable=[];
  totalScore:number=0;
  totalWickets:number=0;
  totalOversBowled:number=0;
  totalExtras:number=0;
  ingEnded:number=0;
  ballsOfOver:number=0;
  isFirstExtraEntry:boolean=true;
  teamAllOut:boolean=false;
  selectValue;
  Innings='inningOne';
  disableBatsmanBtns:boolean=false;
  BowlerfirstName=[];
  BatsmanfirstName=[];
  
  batsmen=[];
  Batsman = {
    batsmanName:'',
    runs:0,
    balls:0,
    fours:0,
    sixes:0,
    dismisal:''
  }
  Bowler = {
    bowlerName:'',
    ballsOfOver:0,
    runsConceded:0,
    oversBowled:0,
    maidens:0,
    wickets:0,
  }
  
  Extra = {
    wides:0,
    noBalls:0,
    legByes:0,
    byes:0
  }

  total= {
    score:0,
    overs:0,
    wickets:0,
    extras:0
  }

  selBowler={
    index:0,
    bowlerName:'',
    ballsOfOver:0,
    runsConceded:0,
    oversBowled:0,
    maidens:0,
    wickets:0,
  };
  matchInitData:any={
    matchName:'',
    teamOne:'',
    teamSecond:'',
    tossWonBy:'',
    choseTo:''
  };
  matchData:any={};
  strikeRates=[];
  currentBatsmen=[];
  bowlerEconomy=[];
  ballsOfOverArr=[];
  Bowlers=[];
  currentRunRate=0;
  bowlerSelected:boolean;
  showFirstInningButton: boolean;
  disableAllBtns: boolean=false;
  showFirstInningslocal:boolean=false;
  valueChanged:boolean=false;
  totalMatchOvers=0;
  inningsEnded:string;
  removeNeedToWin: boolean=false;
  matchName: any;
  activateBatsmen:boolean=false;
  activeBatsman=[];
  index: number=0;
  // today= new Date();
  // todaysDataTime = '';
  constructor(private router: Router,
              private modalService: NgbModal,
              private myservice:MyserviceService,
              private matchinitial: MatchInitials,
              private activatedroute:ActivatedRoute,
              private render:Renderer2) { 
      this.activatedroute.params.subscribe(data => {
        this.matchName=data.matchName;
        console.log(this.matchName);
      });
      this.getMatchInitialsData();
      for(let j=0; j<12; j++){
        this.activeBatsman[j]=true;
      }
      console.log("constructor called");
      
  }

  ngOnInit(): void {
    this.matchInitData = this.matchinitial.matchInitialData;
    this.getData(this.matchName);
 
  }



  async getMatchInitialsData(){
   await this.myservice.getMatchData(this.matchName).subscribe(
      (res)=>{
        if(res){ 
          this.matchInitData = res;
          this.totalMatchOvers=this.matchInitData.overs;
          // console.log(this.matchInitData.teamOne);
          if(this.matchInitData.tossWonBy == this.matchInitData.teamOne && this.matchInitData.choseTo == 'bat' ){
            this.battingChosenby =  this.matchInitData.teamOne;
            this.bowlingChosenby = this.matchInitData.teamSecond;
          }else if (this.matchInitData.tossWonBy == this.matchInitData.teamOne && this.matchInitData.choseTo == 'bowl' ){
            this.bowlingChosenby = this.matchInitData.teamOne;
            this.battingChosenby =  this.matchInitData.teamSecond;
          }else if (this.matchInitData.tossWonBy == this.matchInitData.teamSecond && this.matchInitData.choseTo == 'bat' ){
            this.battingChosenby =  this.matchInitData.teamSecond;
            this.bowlingChosenby = this.matchInitData.teamOne;
          }else if (this.matchInitData.tossWonBy == this.matchInitData.teamSecond && this.matchInitData.choseTo == 'bowl' ){
            this.bowlingChosenby =  this.matchInitData.teamSecond;
            this.battingChosenby =  this.matchInitData.teamOne;
          }
        }
      },
      (err)=>{console.log(err)}
    );
  }

 async getData(name){

 await this.myservice.getData(name).subscribe(
      (response)=>{     
          if(response){
            this.matchData = response;
            
            if(this.matchData.inningTwo){
              this.disableAllBtns=true;
              this.myservice.showFirstInnings=true;
              this.showFirstInningslocal=true;
              this.removeNeedToWin=true;
              for(let j=0; j<11; j++){
                this.activeBatsman[j]=false;
              }  
            }

            
            if(this.matchData.inningOne){
              if(this.matchData.inningOne.batting){
                this.batsmen=this.matchData.inningOne.batting;
                this.totalBatsmen=this.matchData.inningOne.batting.length;
                this.batsmen.forEach((batsman, ind) => {
                  // setting strike rates of batsmen
                  if(batsman.dismisal == "notout"){
                    this.currentBatsmen.push(batsman);
                    this.isDisable[ind]=false;
                  }else if(batsman.dismisal != "notout"){
                    this.isDisable[ind]=true;
                  }    
                  if(batsman.runs < 1){
                    this.strikeRates[ind]=0;
                  }
                  if(batsman.runs>0){
                    this.strikeRates[ind]=((batsman.runs/batsman.balls)*100).toFixed(2);
                  }
                                   
                });
              }
            }
            if(this.matchData.inningOne){
              if(this.matchData.inningOne.bowling){
                this.Bowlers=this.matchData.inningOne.bowling;
                this.Bowlers.forEach((bowler,ind) => {
                  if(bowler.ballsOfOver > 0 || bowler.oversBowled>0)
                    this.bowlerEconomy[ind]=((bowler.runsConceded/((bowler.ballsOfOver)+(bowler.oversBowled*6)))*6).toFixed(2);
                  else if(bowler.ballsOfOver == 0){
                    this.bowlerEconomy[ind]=0; 
                  }
                  if(bowler.ballsOfOver>0)
                    this.ballsOfOver=bowler.ballsOfOver;
                  else if(bowler.ballsOfOver==0)  
                    this.ballsOfOver=0;
                });
                if(this.matchData.inningOne.bowling)
                  this.totalBowlers=this.matchData.inningOne.bowling.length;
              }
            }
            if(this.matchData.inningOne){

              if(this.matchData.inningOne.extras)
                this.Extra = this.matchData.inningOne.extras;
              if(this.matchData.inningOne.total){
                if(this.matchData.inningOne.total.inningsEnded){
                  if(this.matchData.inningOne.total.inningsEnded == 1)
                    this.disAble();
                }
                if(this.matchData.inningOne.total.score)  
                  this.totalScore=this.matchData.inningOne.total.score;
                if(this.matchData.inningOne.total.wickets)
                  this.totalWickets=this.matchData.inningOne.total.wickets;
                if(this.matchData.inningOne.total.overs)  
                  this.totalOversBowled=this.matchData.inningOne.total.overs;
                if(this.matchData.inningOne.total.extras)  
                  this.totalExtras=this.matchData.inningOne.total.extras; 
              } 
              if(this.ballsOfOver>0 || this.totalOversBowled>0){
                this.currentRunRate = +((this.totalScore/ ((this.ballsOfOver)+(this.totalOversBowled*6)))*6).toFixed(2);
              }
                
            }
           
          }
        },
      (err)=>{ console.log(err)}
    );


  }
  
  addBatsman(playername,runs,balls,fours,sixes,dismisal){
    var RegEx = /^[a-z ]+$/i; 
    var valid = RegEx.test(playername.value);
    if(!valid){
      alert("Please enter correct name of the Player");
      return;
    }
    if(this.totalWickets==10){
      // this.teamAllOut=true;
      alert("You cannot add more batsmen");
      return;
    }
    if(playername.value == ''){
      alert("Please Enter the name of the Player");
      return;
    }
    this.Batsman.batsmanName=playername.value;
    this.Batsman.runs=(+runs.value);
    // increment total score
    this.totalScore=(this.totalScore + (+runs.value));
    this.Batsman.balls=(+balls.value);
    this.Batsman.fours=(+fours.value);
    this.Batsman.sixes=(+sixes.value);
    this.Batsman.dismisal=dismisal.value;
    this.batsmen.push(this.Batsman);
    this.myservice.addPlayer(this.Batsman,this.Innings,this.totalBatsmen,this.matchName).subscribe(
      (response)=>{
        this.currentBatsmen=[];
        this.getData(this.matchName);
        console.log(response);
      },
      (err)=>{console.log(err)}
    );
    // // update Score
    this.myservice.updateTotalScore(this.totalScore,this.Innings,this.matchName).subscribe(
      (response)=>{console.log(response)},
      (err)=>{console.log(err)}
    );
    this.isAddBatsman = false;
    this.totalBatsmen+=1;
  }
  addBatsmanBall(ball,playername,dbruns,runs,balls,fours,sixes,dismisal,i){
    if(this.ballsOfOver==0){
      if(ball==0||ball==2 || ball==4 || ball==6){
        for(let j=0; j<this.totalBatsmen; j++){
          this.activeBatsman[j]=true;
        }
        this.activeBatsman.splice(i, 0, false);
      }else if(ball==1 || ball==3 || ball==5){
        for(let j=0; j<this.totalBatsmen; j++){
          this.activeBatsman[j]=false;
        }
        this.activeBatsman.splice(i, 0, true);
      }
    }else{
      if(ball==0||ball==2 || ball==4 || ball==6){
        for(let j=0; j<this.totalBatsmen; j++){
          this.activeBatsman[j]=false;
        }
        this.activeBatsman.splice(i, 0, true);
      }else if(ball==1 || ball==3 || ball==5){
        for(let j=0; j<this.totalBatsmen; j++){
          this.activeBatsman[j]=true;
        }
        this.activeBatsman.splice(i, 0, false);
      }
    }
    
    
    if(ball == 'out'){
      for(let j=0; j<this.totalBatsmen; j++){
        this.activeBatsman[j]=true;
      }
      balls.value=(+balls.value)+1;
      if(dismisal.value == 'notout' || dismisal.value == '' ){
        dismisal.value = 'out';
      }
      this.isDisable.splice(i, 0, true);
    }else{
        runs.value=(+runs.value)+ball;
        balls.value=(+balls.value)+1;
        if(ball == 4 ){
          fours.value=(+fours.value)+1;
        }else if(ball == 6){
          sixes.value=(+sixes.value)+1;
        }
        // increment total score
        this.totalScore=(this.totalScore + (+runs.value));
        this.isDisable.splice(i, 0, false);
    }
    this.updateBatsman(playername,dbruns,runs,balls,fours,sixes,dismisal,i);
  }

  updateBatsman(playername,tmruns,runs,balls,fours,sixes,dismisal,ind){
    this.Batsman.batsmanName=playername.value;
    this.Batsman.runs=(+tmruns)+(+runs.value);
    this.Batsman.balls=(+balls.value);
    this.Batsman.fours=(+fours.value);
    this.Batsman.sixes=(+sixes.value);
    this.Batsman.dismisal=dismisal.value;
    // this.batsmen.splice(ind, 0, this.Batsman);

    this.myservice.updatePlayer(this.Batsman,this.Innings,ind,this.matchName).subscribe(
      (response)=>{
        this.currentBatsmen=[];
        this.strikeRates[ind]=((this.Batsman.runs/this.Batsman.balls)*100).toFixed(2);
        this.getData(this.matchName);
        console.log(response);
      },
      (err)=>{console.log(err)}
    );
    // console.log("this.bastmen",this.Batsmen);
    if(dismisal.value != "notout"){
      this.totalWickets+=1;
    }
    // update totalWickets
    this.myservice.updateTotalwickets(this.totalWickets,this.Innings,this.matchName).subscribe(
      (response)=>{ 
        console.log(response);
      },
      (err)=>{console.log(err)}
    );
    // update totalScore
    this.myservice.updateTotalScore(this.totalScore,this.Innings,this.matchName).subscribe(
      (response)=>{console.log(response)},
      (err)=>{console.log(err)}
    );
    if(this.doesInningsEnded()){
      for(let j=0; j<this.totalBatsmen; j++){
        this.activeBatsman[j]=false;
      }
      this.endFirstInning();
      this.disableBatsmanBtns=true;
      this.bowlerSelected=false;
      return;
    }
    this.activateBatsmen=false;
    // runs.value = 0;
  }

  selectBowler(bowler,ind){
    if(this.doesInningsEnded()){
      return;
    }
    // console.log("yuhoo");
    this.bowlerSelected=true;
    this.selBowler.index=ind;
    this.selBowler.bowlerName=bowler.bowlerName;
    this.selBowler.ballsOfOver=bowler.ballsOfOver;
    this.selBowler.runsConceded=bowler.runsConceded;
    this.selBowler.oversBowled=bowler.oversBowled;
    this.selBowler.maidens=bowler.maidens;
    this.selBowler.wickets=bowler.wickets;

    this.BowlerfirstName = this.selBowler.bowlerName.split(" ", 1); 
    // console.log( this.BowlerfirstName[0]);
  }

  addBowler(bowlerName,ballsOfOver,oversBowled,runsConceded,maidens,wickets){
    var RegEx = /^[a-z ]+$/i; 
    var valid = RegEx.test(bowlerName.value);
    if(!valid){
      alert("Please enter correct name of the Player");
      return;
    }
    if(bowlerName.value == ''){
      alert("Please Enter the name of the Player");
      return;
    }
    
    this.Bowler.bowlerName=bowlerName.value;
    this.Bowler.ballsOfOver=(+ballsOfOver.value);
    this.Bowler.oversBowled=(+oversBowled.value);
    this.Bowler.runsConceded=(+runsConceded.value);
    this.Bowler.maidens=(+maidens.value);
    this.Bowler.wickets=(+wickets.value);
    // console.log(this.Bowler);
    this.Bowlers.push(this.Bowler);

    this.myservice.addBowler(this.Bowler,this.Innings,this.totalBowlers,this.matchName).subscribe(
      (response)=>{
        this.selectBowler(this.Bowler,this.totalBowlers);
        this.currentBatsmen=[];
        this.getData(this.matchName);
        console.log(response);
      },
      (err)=>{console.log(err)}
    );
    this.isAddBowler = false;
    
  }
  

  addBall(ball,bowlerName,ballsOfOver,dboversBowled,oversBowled,runs,runsConceded,maidens,wickets,i){
    if(this.doesInningsEnded()){
      return;
    }
    this.ballsOfOverArr.push(ball);
    if(ball == 'wd' ||ball == '1wd' ||ball == '2wd' ||ball == '3wd'||ball == '4wd'
      ||ball == 'nb'||ball == '1nb' ||ball == '2nb'||ball == '3nb'||ball == '4nb' ||ball == '5nb'||ball == '6nb' 
      ||ball == 'nb+1B' ||ball == 'nb+2B'||ball == 'nb+3B'||ball == 'nb+4B'){
      
      this.ballsOfOver+=0;
    }else{
      this.activateBatsmen=true;
      this.ballsOfOver+=1;
      this.selBowler.ballsOfOver=(+ballsOfOver.value)+1;
      ballsOfOver.value=(+ballsOfOver.value)+1;
    }
    if (ball == 'W'){
      this.selBowler.wickets=(+wickets.value)+1;
      wickets.value=(+wickets.value)+1;
      this.selBowler.runsConceded=(+runsConceded.value)+0;
      runsConceded.value = (+runsConceded.value)+0;
      runs.value = (+runs.value)+0; 
    }else if(ball == 'wd' ||ball == 'nb'){
      if(ball == 'wd'){
        this.Extra.wides = (+this.Extra.wides) +1;
      }else if(ball == 'nb'){
        this.Extra.noBalls = (+this.Extra.noBalls)+1;
      }
      this.totalExtras = (+this.totalExtras)+1;
      this.totalScore=(+this.totalScore) + 1;
      this.selBowler.runsConceded=(+runsConceded.value)+1; 
      runsConceded.value = (+runsConceded.value)+1;
      runs.value = (+runs.value)+1;
    }else if(ball == '1wd' ||ball == '1nb'){
      if(ball == '1wd'){
        this.Extra.wides = (+this.Extra.wides) +2;
      }else if(ball == '1nb'){
        this.Extra.noBalls = (+this.Extra.noBalls)+1;
      }
      this.totalExtras = (+this.totalExtras)+2;
      this.totalScore=(+this.totalScore) + 2;
      this.selBowler.runsConceded=(+runsConceded.value)+2;
      runsConceded.value = (+runsConceded.value)+2;
      runs.value = (+runs.value)+2;
    }else if(ball == '2wd' ||ball == '2nb'){
      if(ball == '2wd'){
        this.Extra.wides = (+this.Extra.wides) +3;
      }else if(ball == '2nb'){
        this.Extra.noBalls = (+this.Extra.noBalls)+3;
      }
      this.totalExtras = (+this.totalExtras)+3;
      this.totalScore=(+this.totalScore) + 3;
      this.selBowler.runsConceded=(+runsConceded.value)+3;
      runsConceded.value = (+runsConceded.value)+3;
      runs.value = (+runs.value)+3;
    }else if(ball == '3wd' ||ball == '3nb'){
      if(ball == '3wd'){
        this.Extra.wides = (+this.Extra.wides) +4;
      }else if(ball == '3nb'){
        this.Extra.noBalls = (+this.Extra.noBalls)+4;
      }
      this.totalExtras = (+this.totalExtras)+4;
      this.totalScore=(+this.totalScore) + 4;
      this.selBowler.runsConceded=(+runsConceded.value)+4;
      runsConceded.value = (+runsConceded.value)+4;
      runs.value = (+runs.value)+4;
    }else if(ball == '4wd' ||ball == '4nb'){
      if(ball == '4wd'){
        this.Extra.wides = (+this.Extra.wides) +5;
      }else if(ball == '4nb'){
        this.Extra.noBalls = (+this.Extra.noBalls)+5;
      }
      this.totalExtras = (+this.totalExtras)+5;
      this.totalScore=(+this.totalScore) + 5;
      this.selBowler.runsConceded=(+runsConceded.value)+5;
      runsConceded.value = (+runsConceded.value)+5;
      runs.value = (+runs.value)+5;
    }else if(ball == 'nb+1B'){
      this.Extra.noBalls = (+this.Extra.noBalls)+1;
      this.Extra.byes = (+this.Extra.byes) +1;
      this.totalExtras = (+this.totalExtras)+2;
      this.totalScore=(+this.totalScore) + 2;
      this.selBowler.runsConceded=(+runsConceded.value)+1;
      runsConceded.value = (+runsConceded.value)+1;
      runs.value = (+runs.value)+1;  
    }else if(ball == 'nb+2B'){
      this.Extra.noBalls = (+this.Extra.noBalls)+1;
      this.Extra.byes = (+this.Extra.byes) +2;
      this.totalExtras = (+this.totalExtras)+3;
      this.totalScore=(+this.totalScore) + 3;
      this.selBowler.runsConceded=(+runsConceded.value)+1;
      runsConceded.value = (+runsConceded.value)+1;
      runs.value = (+runs.value)+1;  
    }else if(ball == 'nb+3B'){
      this.Extra.noBalls = (+this.Extra.noBalls)+1;
      this.Extra.byes = (+this.Extra.byes) +3;
      this.totalExtras = (+this.totalExtras)+4;
      this.totalScore=(+this.totalScore) + 4;
      this.selBowler.runsConceded=(+runsConceded.value)+1;
      runsConceded.value = (+runsConceded.value)+1;
      runs.value = (+runs.value)+1;  
    }else if(ball == 'nb+4B'){
      this.Extra.noBalls = (+this.Extra.noBalls)+1;
      this.Extra.byes = (+this.Extra.byes) +4;
      this.totalExtras = (+this.totalExtras)+5;
      this.totalScore=(+this.totalScore) + 5;
      this.selBowler.runsConceded=(+runsConceded.value)+1;
      runsConceded.value = (+runsConceded.value)+1;
      runs.value = (+runs.value)+1;  
    }else if(ball == '5nb'){
      this.Extra.noBalls = (+this.Extra.noBalls)+6;
      this.totalExtras = (+this.totalExtras)+6;
      this.totalScore=(+this.totalScore) + 6;
      this.selBowler.runsConceded=(+runsConceded.value)+6;
      runsConceded.value = (+runsConceded.value)+6;
      runs.value = (+runs.value)+6;
    }else if(ball == '6nb'){
      this.Extra.noBalls = (+this.Extra.noBalls)+7;
      this.totalExtras = (+this.totalExtras)+7;
      this.totalScore=(+this.totalScore) + 7;
      this.selBowler.runsConceded=(+runsConceded.value)+7;
      runsConceded.value = (+runsConceded.value)+7;
      runs.value = (+runs.value)+7;
    } else if(ball=='1b'||ball=='1lb'){
      if(ball == '1b'){
        this.Extra.byes = (+this.Extra.byes) +1;
      }else if(ball == '1lb'){
        this.Extra.legByes = (+this.Extra.legByes)+1;
      }
      this.totalExtras = (+this.totalExtras)+1;
      this.totalScore=(+this.totalScore) + 1;
    }else if(ball=='2b'||ball=='2lb'){
      if(ball == '2b'){
        this.Extra.byes = (+this.Extra.byes) +2;
      }else if(ball == '2lb'){
        this.Extra.legByes = (+this.Extra.legByes)+2;
      }
      this.totalScore=(+this.totalScore) + 2;
      this.totalExtras = (+this.totalExtras)+2;
    }else if(ball=='3b'||ball=='3lb'){
      if(ball == '3b'){
        this.Extra.byes = (+this.Extra.byes) +3;
      }else if(ball == '3lb'){
        this.Extra.legByes = (+this.Extra.legByes)+3;
      }
      this.totalScore=(+this.totalScore) + 3;
      this.totalExtras = (+this.totalExtras)+3;
    }else if(ball=='4b'||ball=='4lb'){
      if(ball == '4b'){
        this.Extra.byes = (+this.Extra.byes) +4;
      }else if(ball == '4lb'){
        this.Extra.legByes = (+this.Extra.legByes)+4;
      }
      this.totalExtras = (+this.totalExtras)+4;
      this.totalScore=(this.totalScore + 4);
    }else{
      this.selBowler.runsConceded=(+runsConceded.value)+ball;
      runsConceded.value=(+runsConceded.value)+ball;
      runs.value = (+runs.value)+ball;
    }

    this.ingEnded=0;
    // update totalScore
    this.myservice.updateTotalScore(this.totalScore,this.Innings,this.matchName).subscribe(
      (response)=>{console.log(response)},
      (err)=>{console.log(err)}
    );

    this.myservice.updateExtras(this.Extra,this.Innings,this.matchName).subscribe(
      (response)=>{console.log(response)},
      (err)=>{console.log(err)}
    );
    
    // //update totalExtras
    this.myservice.updateTotalextras(this.totalExtras,this.Innings,this.matchName).subscribe(
       (response)=>{console.log(response)},
        (err)=>{console.log(err)}
    );

    this.myservice.inningsEnded(this.ingEnded,this.Innings,this.matchName).subscribe(
      (res)=>{console.log(res)},
      (err)=>{console.log(err)}
    );
  
    if(this.selBowler.ballsOfOver == 6){
      if(runs.value<1){
        maidens.value=+(maidens.value)+1;
      }
      setTimeout(()=>{
        this.overBowled=true;
        this.ballsOfOverArr=[];
      },3000);
      oversBowled.value=(+oversBowled.value)+1;
      this.selBowler.ballsOfOver=0;
      ballsOfOver.value=0;
      this.ballsOfOver=0;
    }
    this.updateBowler(bowlerName,ballsOfOver, dboversBowled,oversBowled,runsConceded,maidens,wickets,i)
  }

  updateBowler(bowlerName,ballsOfOver, dboversBowled,oversBowled,runsConceded,maidens,wickets,index){
    this.Bowler.bowlerName=bowlerName.value;
    this.Bowler.ballsOfOver=(+ballsOfOver.value);
    this.Bowler.oversBowled=(+dboversBowled)+(+oversBowled.value);
    this.Bowler.runsConceded=(+runsConceded.value);
    this.Bowler.maidens=(+maidens.value);
    this.Bowler.wickets=(+wickets.value);
    this.myservice.updateBowler(this.Bowler,this.Innings,index,this.matchName).subscribe(
      (response)=>{
        console.log(response);
        this.currentBatsmen=[];
        this.getData(this.matchName);
        if(this.Bowler.ballsOfOver>0||this.Bowler.oversBowled>0)
          this.bowlerEconomy[index]=((this.Bowler.runsConceded/((this.Bowler.ballsOfOver)+(this.Bowler.oversBowled*6)))*6).toFixed(2);
      },
      (err)=>{console.log(err)}
    );

    this.totalOversBowled = (this.totalOversBowled + (+oversBowled.value));
    // update totalOvers
    this.myservice.updateTotalOvers(this.totalOversBowled,this.Innings,this.matchName).subscribe(
      (response)=>{
        console.log(response)
      },
      (err)=>{console.log(err)}
    );
    
    oversBowled.value = 0;
  }

  addNewBatsman(){
    if(this.doesInningsEnded()){
      return;
    }
    if(this.isAddBatsman){
      this.isAddBatsman=false;
    }else{
      this.isAddBatsman=true;
    }
  }

  addNewBowler(){
    if(this.doesInningsEnded()){
      return;
    }
    if(this.isAddBowler){
      this.isAddBowler=false;
    }else{
      this.isAddBowler=true;
    }
  }
  
  endFirstInning(){
    this.ingEnded=1;
    this.myservice.inningsEnded(this.ingEnded,this.Innings,this.matchName).subscribe((res)=>{console.log(res)});
    this.disAble();
  }

  disAble(){
    this.inningsEnded="First Innings Ended";
    this.disableAllBtns=true;
    this.myservice.showFirstInnings=true;
    this.showFirstInningslocal=true;
    this.bowlerSelected=false;
    this.disableBatsmanBtns=true;
  }

  doesInningsEnded(){
    if(this.totalOversBowled == this.totalMatchOvers){
      alert("All Overs Bowled!!! Press End First Innings button");
      return true;
    }
    if(this.totalWickets == 10){
      alert("Team Bowled out!!! Press End First Innings button");
      return true;
    }
    return false;
  }
  
}

