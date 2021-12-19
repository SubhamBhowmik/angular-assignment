import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 public signupForm !: FormGroup;
  constructor(private formbuilder :FormBuilder,private http:HttpClient,private router:Router) { }

  ngOnInit(): void {

    this.signupForm=this.formbuilder.group({
      email:['',Validators.required],
      firstname:[''],
      lastname:[''],
      password:['',Validators.required],
      address:[''],
      birthdate:[''],
    })
  }

  signUp(){
    this.http.post<any>("http://localhost:3000/signupdata",this.signupForm.value)
    .subscribe(res=>{
      alert('Sign Up successfull');
      this.signupForm.reset();
      this.router.navigate(['dashboard']);
    })
  }

}
