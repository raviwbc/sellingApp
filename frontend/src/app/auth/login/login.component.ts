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
    this.loginService.registor().subscribe({
      next:(res:any)=>{
        this.registerData=res
      }
    })
  }
  fetch(){
    debugger
    console.log('login data',this.loginForm.value.username);
    console.log('registerData',  this.registerData);
    if(this.loginForm.controls['username'].value != '' && this.loginForm.controls['password'].value != ''){
    let isAvailable = this.registerData.find((res:any)=>res.username == this.loginForm.value.username && res.password == this.loginForm.value.password )
    if(isAvailable){
      this.toastr.success('Welcome to prizzy!')
      this.route.navigateByUrl('/auth/registor')

    }else{
      this.toastr.error('Cannot find your credentials!')
    }
    }else{
      this.toastr.error('Please fill all the field!')
    }
    
  }
  redirectTo(){
    this.route.navigateByUrl('/auth/registor')
  }
}
