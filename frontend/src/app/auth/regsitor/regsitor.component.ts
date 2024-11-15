import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-regsitor',
  templateUrl: './regsitor.component.html',
  styleUrls: ['./regsitor.component.scss']
})
export class RegsitorComponent implements OnInit{
constructor(private fb:FormBuilder,private loginService:LoginService,private route:Router,private toastr:ToastrService){}
registerForm:FormGroup =this.fb.group({
  name:['',Validators.required],
  teamName:['',Validators.required],
  basePrice:['',Validators.required],
  avlMembers:['',Validators.required],

})
teamList:any[]=[]
ngOnInit(): void {
  debugger
  this.loginService.getTeam().subscribe({
    next:(res:any)=>{
      this.teamList = res
    },
    error:(err:any)=>{
      console.log('err',err);
      
    }
  })
}
fetch(){
console.log('sanjai',this.registerForm.value);
if(this.registerForm.controls['name'].value != '' && this.registerForm.controls['teamName'].value != '' && this.registerForm.controls['basePrice'].value != ''  && this.registerForm.controls['avlMembers'].value != '' ){
  this.loginService.postRegister(this.registerForm.value).subscribe({
    next: (res:any)=>{
      console.log('Res',res);      
    },
    error:(err)=>{
      console.log('Res',err);
    }
  })
}else{
  this.toastr.error('Please fill all the field!')
}


}
redirectTo(){
  this.route.navigateByUrl('/auth/login')
}
}
