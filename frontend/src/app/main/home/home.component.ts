import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { completedList } from 'src/app/model/main';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  
  constructor (private mainService: MainService){}

  unsubscribe$ = new Subject<boolean>()
  intervalTimer : any

  ngOnInit(): void {
    this.completedItems()
    this.intervalTimer = setInterval(()=> this.completedItems(), 25000)
  }
  completedList : completedList[]=[]

  completedItems(){
    this.mainService.getCompleteList().pipe(takeUntil(this.unsubscribe$)).subscribe({
      next : (res:any)=>{
        this.completedList = res
        console.log('Completed List Got')
        }
    })
  }

  ngOnDestroy() {
    this.intervalTimer.clearInterval()
    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

}
