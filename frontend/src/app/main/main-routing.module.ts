import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyItemComponent } from './buy-item/buy-item.component';
import { MainComponent } from './main.component';
import { SellItemComponent } from './sell-item/sell-item.component';

const routes: Routes = [
  {
    path:'',
    component : MainComponent,
    children : [
      {
        path : 'sell',
        component : SellItemComponent
      },
      {
        path : 'buy',
        component : BuyItemComponent
      },
      {
        path : '',
        redirectTo : 'buy',
        pathMatch : 'full'
      },
      {
        path : '**',
        redirectTo : 'buy',
        pathMatch : 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
