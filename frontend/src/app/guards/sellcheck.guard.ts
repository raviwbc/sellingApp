import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';
import { MainService } from '../service/main.service';

@Injectable({
  providedIn: 'root'
})
export class SellcheckGuard implements CanActivate {
  constructor(private employeeService: MainService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve)=>{
      try{
        const data = await lastValueFrom(this.employeeService.getCurrentUser())
        console.log(route.routeConfig?.path, data.userType)
        debugger
        if(route.routeConfig?.path == 'sell'){
          if(data.userType == 'Admin' || data.userType == 'Seller'){
            resolve(true)
          }else{
          this.router.navigateByUrl('/main/home')
          resolve(false)}
        }else if(route.routeConfig?.path == 'buy'){
          if(data.userType == 'Admin' || data.userType == 'buyer'){
            resolve(true)
          }else{
          this.router.navigateByUrl('/main/home')
          resolve(false)}
        }else{
          this.router.navigateByUrl('/main/home')
          resolve(false)
        }        
      }
      catch{
        this.router.navigateByUrl('/main/buy')
        resolve(false)
    }
    });
  }
  
}
