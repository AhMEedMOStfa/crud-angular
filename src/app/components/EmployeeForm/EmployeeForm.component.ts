import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/interface/Employee';
import { EmployeeServiceService } from 'src/service/EmployeeService.service';
import { HideFormService } from 'src/service/hideForm.service';

@Component({
  selector: 'app-EmployeeForm',
  templateUrl: './EmployeeForm.component.html',
  styleUrls: ['./EmployeeForm.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Output() sendEmployeeData:EventEmitter<Employee>;
  employee!:Object;
  
  employeeForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
    age:[0 , [Validators.required,Validators.min(15),Validators.max(70)]],
    birthOfDate:['',[Validators.required]],
    address:['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]]
  })
  constructor(private fb:FormBuilder , private employeeService:EmployeeServiceService , public hideForm:HideFormService) { 
    this.sendEmployeeData = new EventEmitter<Employee>();
  }
  submitForm(){
    let name = this.employeeForm.controls['name'].value;
    let age = this.employeeForm.controls['age'].value;
    let birthOfDate = this.employeeForm.controls['birthOfDate'].value;
    let address = this.employeeForm.controls['address'].value;
    this.employee={
      name,
      age,
      birthOfDate,
      address,
    }    
    this.employeeService.addEmployee(this.employee).subscribe({
      next:(data)=>{
        this.sendEmployeeData.emit(data);  
        alert('Record Added Succefully');
        this.hideForm.ishide = !this.hideForm.ishide;
      }
    })
  }
  onCloseForm(){
  this.hideForm.ishide = !this.hideForm.ishide;
  }


  ngOnInit() {
  }

}
