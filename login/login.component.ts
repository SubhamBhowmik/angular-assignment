import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],

    })
  }

  login(){
   this.http.get<any>("http://localhost:3000/signupdata")
   .subscribe(res=>{
     
     const user=res.find((a:any)=>{
      
       
       
     return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
     });
     if(user){
       alert('login successful');
       this.loginForm.reset();
       this.router.navigate(['dashboard'])
     }else{
       alert('user not found')
     }
   },err=>{
     console.log(err);
     alert('something went error')
     
   })
  }

}
