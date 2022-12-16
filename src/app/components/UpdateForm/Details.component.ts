import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/interface/Employee';
import { EmployeeServiceService } from 'src/service/EmployeeService.service';
import { HideFormService } from 'src/service/hideForm.service';

@Component({
  selector: 'app-Details',
  templateUrl: './Details.component.html',
  styleUrls: ['./Details.component.css']
})
export class DetailsComponent implements OnInit  {
  @Input() empData?:Employee;
  @Output() sendEmpData:EventEmitter<Employee>;
  employee!:Object;
  employeeForm:FormGroup = this.fb.group({
    name:['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]],
    age:['' , [Validators.required,Validators.min(15),Validators.max(70)]],
    birthOfDate:['',[Validators.required]],
    address:['',[Validators.required,Validators.minLength(4),Validators.maxLength(200)]]
  })
  constructor(private fb:FormBuilder , private employeeService:EmployeeServiceService , public hideForm:HideFormService) {
    this.sendEmpData = new EventEmitter<Employee>();
   }
  ngOnInit() {   
    
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
    this.employeeService.updateEmployeeData(this.empData?.id,this.employee).subscribe({
      next:(data)=>{
        this.sendEmpData.emit(data); 
        alert('Record Updated Succefully');
        this.hideForm.isShown = !this.hideForm.isShown;
      }
    })
  }
  onCloseForm(){
    this.hideForm.isShown = !this.hideForm.isShown;
    }

}
