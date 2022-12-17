import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/interface/Employee';
import { EmployeeServiceService } from 'src/app/service/EmployeeService.service';
import { HideFormService } from 'src/app/service/hideForm.service';

@Component({
  selector: 'app-EmployeeForm',
  templateUrl: './EmployeeForm.component.html',
  styleUrls: ['./EmployeeForm.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() sendEmployeeData:EventEmitter<Employee>; //to sent employee interface after fill  incase of update or post
  @Input() empData?:Employee;//to recieve emp interface incase of update record
  employeeForm!:FormGroup;//use reactive form module
  employee!:Employee;
  
 
  constructor(private fb:FormBuilder , private employeeService:EmployeeServiceService , public hideForm:HideFormService) { 
    this.sendEmployeeData = new EventEmitter<Employee>();
  }
  ngOnInit() {
    if(!this.empData){
      this.employeeForm = this.fb.group({
        name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
        age:[0 , [Validators.required,Validators.min(15),Validators.max(70)]],
        birthOfDate:['',[Validators.required]],
        address:['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]]
      })
    }
    else
    {
      this.employeeForm = this.fb.group({
        name:[this.empData.name,[Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
        age:[this.empData.age , [Validators.required,Validators.min(15),Validators.max(70)]],
        birthOfDate:[this.empData.birthOfDate,[Validators.required]],
        address:[this.empData.address,[Validators.required,Validators.minLength(4),Validators.maxLength(200)]]
      })
    }
  }
 
  submitForm(){
    if(this.employeeForm.valid)
    {
      //to close form after validation
        this.onCloseForm();
      //this emp inter will pass to post and update method
        this.employee={
          name:this.employeeForm.controls['name'].value,
          age:this.employeeForm.controls['age'].value,
          birthOfDate:this.employeeForm.controls['birthOfDate'].value,
          address:this.employeeForm.controls['address'].value,
        }  
          //incase of add new employee
      if(!this.empData)
      {
        this.employeeService.addEmployee(this.employee).subscribe({
          next:(data:Employee)=>{
            this.sendEmployeeData.emit(data);
            this.employeeForm.reset();
          }
        })
      }
      //incase of update new employee
      else
      {
        this.employeeService.updateEmployeeData(this.empData.id,this.employee).subscribe({
          next:(data:Employee)=>{
            this.sendEmployeeData.emit(data);           
          }
        })
      }
    }
    //to prevent submit before fill all data
    else
    {
      this.employeeForm.markAllAsTouched()
    }   
  }
  //to close form
  onCloseForm(){
  this.hideForm.ishide.next(!this.hideForm.ishide.value);
  }
}
