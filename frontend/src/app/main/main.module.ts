import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SellItemComponent } from './sell-item/sell-item.component';
import { MainComponent } from './main.component';
import { BuyItemComponent } from './buy-item/buy-item.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    SellItemComponent,
    MainComponent,
    BuyItemComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
