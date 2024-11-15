import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable,Subject,takeUntil } from 'rxjs';
import { completedList, currentBid, getAcuHistory } from 'src/app/model/main';
import { LoginService } from 'src/app/service/login.service';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.scss']
})
export class SellItemComponent implements OnInit, OnDestroy {
  constructor(private mainService:MainService, private fb: FormBuilder){}
  ngOnInit() {
    this.getCurrentBid()
    setInterval(()=> this.getCurrentBid(), 10000)
  }
  ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe();
  }
  item = "pp";
  bidHistory : getAcuHistory[]=[];
  currentItem  = new currentBid()
  completedList : completedList[]=[]
  
  destroy$: Subject<boolean> = new Subject<boolean>();

  bidCreateForm : FormGroup = this.fb.group({
    pname : this.fb.control('', Validators.required),
    country : this.fb.control('', Validators.required),
    base : this.fb.control('', Validators.required)
  })

  bidCreate() {
    if (this.bidCreateForm.valid) {
      let data = this.bidCreateForm.value
      let bidPost = {
        name: data.pname,
        Country: data.country,
        Records: [],
        base_p: data.base
      }
      this.mainService.postCurrentBid(bidPost).subscribe({
        next: () => {
          console.log('Player Created')
          this.getCurrentBid()
        }
      })
    } else {
      alert('form InVaild Check and inter the Correct Value')
    }
  }

  getHistory(){
    this.mainService.getCurrentHistory().pipe(takeUntil(this.destroy$)).subscribe({
      next : (resp: getAcuHistory[])=>{
        this.bidHistory = resp
      }
    })
  }

  async stopBid(){
    let finaldata = this.bidHistory[this.bidHistory.length - 1];    
    let data = {
      pname : finaldata.pname,
      tname : finaldata.team,
      prize : finaldata.prize,
      bid_history : this.bidHistory
    }
    this.mainService.updateCompleteList(data).subscribe({
      next : ()=> {
        this.deleteAllHistory()
        this.deleteCntBid()
        this.getCurrentBid()
        this.completedItems()
      }
    })
  }
  deleteAllHistory(){
    this.bidHistory.forEach(element => {
      this.deleteBid(element.id)
    });
  }
  deleteBid(id:string){
    this.mainService.deleteCurrentHistory(id).subscribe({
      next: ()=>{
        this.getHistory()
      }
    })
  }

  getCurrentBid(){
    this.mainService.getCurrentBid().pipe(takeUntil(this.destroy$)).subscribe({
      next : (resp:currentBid[])=>{
        console.log()
        this.currentItem = resp[0]
        this.getHistory()
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
  deleteCntBid(){
    
    this.mainService.deleteCurrentBid(this.currentItem.id).subscribe({
      next : ()=>{
        console.log('current List Deleted')
      }
    })
  }


}
