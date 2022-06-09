import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  showMatchInitForm:boolean=false;
  showFirstInnings:boolean;
  disableBtns:boolean;
  
  // url="https://basic-crud-db-default-rtdb.firebaseio.com/teamOne.json";
  // url = "https://cricketdb-5967e-default-rtdb.firebaseio.com/match.json";
  constructor(private http:HttpClient) { }
  

  addMatchInit(matchInitObj,match){
    let matchInitURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${match}-init.json`;
    return this.http.put(matchInitURL,matchInitObj);
  }
  getMatchInitData(){
    let matchInitURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket.json`;
    return this.http.get(matchInitURL);
  }

  getMatchData(match){
    let matchURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${match}-init.json`;
    return this.http.get(matchURL);
  }


  getData(name){ 
    let URL = `https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}.json`;
    return this.http.get(URL);
  }


  // this.Batsman,this.Match, this.Innings, this.totalBatsmen
  addPlayer(Batsman:any,innings, i,name){
    let forBatting=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/batting/${i}.json`;
    return this.http.put(forBatting,Batsman);
  }
  
  updatePlayer(player:any, innings, i,name){
    let forBatting=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/batting/${i}.json`;
    return this.http.put(forBatting,player);
  }

  addBowler(bowler:any,innings, ind,name){
    // console.log(bowler,innings,ind);
     let bowlingURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/bowling/${ind}.json`;
   return this.http.put(bowlingURL,bowler);
  }

  updateBowler(bowler:any, innings,index,name){
    let bowlingURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/bowling/${index}.json`;
    return this.http.put(bowlingURL,bowler);
  }

  addExtras(extra:any,innings,ind,name){
    let extrasURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/extras/${ind}.json`;
    return this.http.put(extrasURL,extra);
  }
  updateExtras(extra:any,innings,name){
    let extrasURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/extras.json`;
    return this.http.put(extrasURL,extra);
  }

  updateTotalScore(totalScore:number,innings,name){
    let scoresURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/total/score.json`;
    return this.http.put(scoresURL,totalScore);
  }
  updateTotalextras(totalExtras:number,innings,name){
    let extrasURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/total/extras.json`;
    return this.http.put(extrasURL,totalExtras);
  }

  updateTotalwickets(totalWickets:number,innings,name){
    let wicketsURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/total/wickets.json`;
    return this.http.put(wicketsURL,totalWickets);
  }

  updateTotalOvers(totalOvers:number,innings,name){
    let oversURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/total/overs.json`;
    return this.http.put(oversURL,totalOvers);
  }

  inningsEnded(isInningsEnd:number,innings,name){
    let ingEndedURL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/cricket/${name}/${innings}/total/inningsEnded.json`;
    return this.http.put(ingEndedURL,isInningsEnd);
  }

  deleteAll(){
    let URL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/match.json`;
    return this.http.delete(URL);
  }

  deleteInit(){
    let URL=`https://cricketdb-5967e-default-rtdb.firebaseio.com/matchinit.json`;
    return this.http.delete(URL);
  }

}
