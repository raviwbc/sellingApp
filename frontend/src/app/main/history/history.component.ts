import { Component, Input } from '@angular/core';
import { completedList, getAcuHistory } from 'src/app/model/main';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input('data') bidHistory: getAcuHistory[]= []
  @Input('data_comp') completedList:completedList[]  = []
}
