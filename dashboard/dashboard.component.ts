import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { EmployeeModel } from './dashboard.model';
import { ApiService} from '../shared/api.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  constructor(private formbuilder :FormBuilder,private api:ApiService) { }
  employeeData !:any;
 
  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
      firstname:[''],
      lastname:[''],
      address:[''],
      birthdate:[''],
      mobile:[''],
      city:[''],
    })
     
     this.getAllEmployee();
  }
   









  clickAddEmployee(){
    
    this.formValue.reset();
   
  }
  getAllEmployee(){
    
    this.api.getemployee()
    .subscribe(res=>{
         this.employeeData=res;
    })
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstname=this.formValue.value.firstname;
    this.employeeModelObj.lastname=this.formValue.value.lastname;
    this.employeeModelObj.address=this.formValue.value.address;
    this.employeeModelObj.birthdate=this.formValue.value.birthdate;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.city=this.formValue.value.city;

    this.api.postemployee(this.employeeModelObj)
    .subscribe(res=>{
      console.log(res);
      alert('employee added')
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
    })
   
  }


  deleteEmployee(row:any){
    this.api.deleteemployee(row.id)
    .subscribe(res=>{
      alert('Employee Deleted');
      this.getAllEmployee();
    })
  }

  onEdit(row:any){
    
    this.employeeModelObj.id=row.id;
    this.formValue.controls['firstname'].setValue(row.firstname);
    this.formValue.controls['lastname'].setValue(row.lastname);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['birthdate'].setValue(row.birthdate);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['city'].setValue(row.city);
    
  
  }


  updateEmployee(){
    this.employeeModelObj.firstname=this.formValue.value.firstname;
    this.employeeModelObj.lastname=this.formValue.value.lastname;
    this.employeeModelObj.address=this.formValue.value.address;
    this.employeeModelObj.birthdate=this.formValue.value.birthdate;
    this.employeeModelObj.mobile=this.formValue.value.mobile;
    this.employeeModelObj.city=this.formValue.value.city;

    this.api.updateemployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert('Updated Successfully')
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      
    })
  }

}
