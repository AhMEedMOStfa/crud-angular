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
  @Output() sendEmployeeData:EventEmitter<Employee>;
  @Input() empData?:Employee;
  employeeForm!:FormGroup;
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
    this.employeeForm.markAllAsTouched();
    if(!this.empData)
    {
      this.employeeService.addEmployee(this.employee).subscribe({
        next:(data:Employee)=>{
          this.sendEmployeeData.emit(data);  
          alert('Record Added Succefully');
          this.onCloseForm();
        }
      })
    }
    else
    {
      this.employeeService.updateEmployeeData(this.empData?.id,this.employee).subscribe({
        next:(data:Employee)=>{
          this.sendEmployeeData.emit(data); 
          alert('Record Updated Succefully');
          this.onCloseForm();
        }
      })
    }
  }
  onCloseForm(){
  this.hideForm.ishide.next(!this.hideForm.ishide.value);
  }


  

}
