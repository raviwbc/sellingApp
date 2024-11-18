import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject,takeUntil } from 'rxjs';
import { completedList, currentBid, getAcuHistory } from 'src/app/model/main';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.scss']
})
export class BuyItemComponent implements OnDestroy{
constructor (private mainService :MainService, private toastr : ToastrService){}

currentItem  = new currentBid()
bidHistory : getAcuHistory[] = []
completedList : completedList[]=[]
destroy$ = new Subject<boolean>()
destroyHistory$ = new Subject<boolean>()
historyInterval:any;
ngOnDestroy(){
  this.destroy$.next(true)
  this.destroy$.unsubscribe();
}

  getCurrentBid(){
    this.mainService.getCurrentBid().pipe(takeUntil(this.destroy$)).subscribe({
      next : (resp:currentBid[])=>{
        console.log()
        this.currentItem = resp[0]
        if(resp.length){
          if(!this.historyInterval){
          this.loophistory()
        }
        }else{
          console.log(this.historyInterval)
          clearInterval(this.historyInterval)
        } 
      }
    })
  }
  loophistory(){
    this.historyInterval = setInterval(()=> {this.getHistory()}, 5000)
    
  }
  getHistory(){
    this.mainService.getCurrentHistory().pipe(takeUntil(this.destroyHistory$)).subscribe({
      next : (resp: getAcuHistory[])=>{
        this.bidHistory = resp
        this.destroyHistory$.next(true)
        this.destroyHistory$.complete()
      }
    })
   

  }
  bid(){
    let dateTime = new Date()
    let prize = this.bidHistory.length ? this.bidHistory[this.bidHistory.length - 1].prize == 0 ? this.currentItem.base_p : this.bidHistory[this.bidHistory.length - 1].prize : this.currentItem.base_p;
    const team = localStorage.getItem('team');
    if(!team){
      this.toastr.error('Team not updated Contect Admin')
      return
    }
    let prepareBid = {
      "team": team,
    "pname": this.currentItem.name,
    "time": dateTime.getTime(),
    "prize": prize + 0.25,
    "date": dateTime.getDay()
    }
    console.log(prepareBid)
    this.mainService.postCurrentHistory(prepareBid).subscribe({
      next: (res)=>{
        res?.statuscode == 201 ?this.toastr.success(res.message) : this.toastr.error(res.message)
      }
    })

  }
  completedItems(){
    this.mainService.getCompleteList().subscribe({
      next : (res:any)=>{
        this.completedList = res
        console.log('Completed List Got')
        }
    })
  }
  ngOnInit(){
    this.getCurrentBid()
    this.completedItems()
    setInterval(()=> this.getCurrentBid(), 10000)
    setInterval(()=> this.completedItems(), 25000)
  }

}
