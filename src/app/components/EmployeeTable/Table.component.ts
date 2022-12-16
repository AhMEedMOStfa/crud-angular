import { Component, OnInit , OnDestroy, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {  Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { Employee } from 'src/interface/Employee';
import { EmployeeServiceService } from 'src/service/EmployeeService.service';
import { HideFormService } from 'src/service/hideForm.service';


@Component({
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css']
})
export class TableComponent implements OnInit , OnDestroy   {
  empObject!:Employee;
  employeesArray!:Employee[];
  employeeDetails!:Employee;
  employeeData!:Employee;
  destroySubsArray:Subscription[] = [];
  constructor(private employeeService:EmployeeServiceService , public hideForm:HideFormService) { }

  ngOnInit() {
    let Subs = this.employeeService.getAllEmployee().subscribe(
      {
        next:(employeesData)=> {this.employeesArray = employeesData;
        },
        error:(e)=>console.log(e),
        // complete:()=>console.log("Data Completed")  
      }
    )        
    this.destroySubsArray.push(Subs); 
  }
  //add employee method
  postEmployee(emp:Employee){
    this.employeesArray.push(emp);    
  }
  
  deleteRecord(EmpId:number){
    //this remove from backend don't render on UI
    this.employeeService.deleteEmployee(EmpId).subscribe({
      next:()=>alert('Record Deleted Succefully')
    }
    );
     //remove Employee from Array to render on UI
     let removedObjectIndex = this.employeesArray.findIndex((data)=>data.id===EmpId)
     if(removedObjectIndex!==-1){
       this.employeesArray.splice(removedObjectIndex,1)
     }
  }
  updateEmp(emp:Employee){
    this.employeesArray.forEach((val,i)=>{
      (i ==emp.id-1)?this.employeesArray[i] = emp:''
    })
  }
  btnUpdateRecord(EmpId:number){
    let Subs=this.employeeService.getEmployeeById(EmpId).subscribe({
      next:(empDetails)=>{this.empObject = empDetails;
      this.hideForm.isShown = !this.hideForm.isShown
    }   
    }
    )
    this.destroySubsArray.push(Subs );
  }
  onAddEmp(){
    this.hideForm.ishide = !this.hideForm.ishide;
  }
  
  ngOnDestroy(): void {
    this.destroySubsArray.forEach((ele)=>ele.unsubscribe());
  }

}
 // getEmployeeDetails(EmpId:number){
  //   let Subs=this.employeeService.getEmployeeById(EmpId).subscribe({
  //     next:(empDetails)=>this.employeeDetails = empDetails,
  //     error:(e)=>console.log(e),
  //     // complete:()=>console.log('Details Completed')
  //   }
  //   )
  //    this.router.navigate(['/Employees',EmpId]);
  //    this.destroySubsArray.push(Subs);
  // }
