import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellcheckGuard } from '../guards/sellcheck.guard';
import { BuyItemComponent } from './buy-item/buy-item.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { SellItemComponent } from './sell-item/sell-item.component';

const routes: Routes = [
  {
    path:'',
    component : MainComponent,
    children : [
      {
        path : 'sell',
        canActivate : [SellcheckGuard],
        component : SellItemComponent
      },
      {
        path : 'buy',  
        canActivate : [SellcheckGuard],
        component : BuyItemComponent
      },
      {
        path : 'home',  
        component : HomeComponent,
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
