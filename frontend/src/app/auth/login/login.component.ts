import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private fb:FormBuilder,private loginService:LoginService,private toastr:ToastrService,private route:Router){}
  loginForm:FormGroup =this.fb.group({
    username:['',Validators.required],
    password:['',Validators.required],    
  })
registerData:any[]=[]
  ngOnInit(): void {
    localStorage.removeItem('BidingAppToken')
  }
  fetch(){
    debugger
    console.log('login data',this.loginForm.value.username);
    console.log('registerData',  this.registerData);
    if(this.loginForm.valid){
    this.loginService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        if(res.status== 200){
          localStorage.setItem('BidingAppToken', res.jwtToken)
          this.toastr.success(res?.message) 
          this.route.navigateByUrl('/main')
        }
          else{  this.toastr.error(res?.message) }
        
      }

    })
  }}
  redirectTo(){
    this.route.navigateByUrl('/auth/registor')
  }
}
