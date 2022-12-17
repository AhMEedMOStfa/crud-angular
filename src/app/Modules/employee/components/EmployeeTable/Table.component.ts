import { Component, OnInit , OnDestroy} from '@angular/core';
import {  Subscription } from 'rxjs';
import { Employee } from 'src/app/interface/Employee';
import { EmployeeServiceService } from 'src/app/service/EmployeeService.service';
import { HideFormService } from 'src/app/service/hideForm.service';


@Component({
  selector: 'app-Table',
  templateUrl: './Table.component.html',
  styleUrls: ['./Table.component.css']
})
export class TableComponent implements OnInit , OnDestroy   {
  employeesArray!:Employee[];//collect employee data
  employeeData!:Employee | undefined ;//this may be undefined to convert employee from update case to post case
  destroySubsArray:Subscription[] = [];//this array to collect all subscription to destroy
  constructor(private employeeService:EmployeeServiceService , public hideForm:HideFormService) { }

  ngOnInit() {
    //fetch api to get all Employee data
    let Subs = this.employeeService.getAllEmployee().subscribe(
      {
        next:(employeesData)=> this.employeesArray = employeesData
      }
    )        
    this.destroySubsArray.push(Subs); 
  }
  //this method to post new record or update record in employee form
  postUpdateEmployee(emp:Employee){
    if(!this.employeeData)
    {
      this.employeesArray.push(emp);    
    }
    else
    {
     let index= this.employeesArray.findIndex((i)=>i.id === emp.id);
     this.employeesArray[index] = emp;
    }
  }
  
  deleteRecord(EmpId:number){
    //this remove from backend don't render on UI
   let Subs= this.employeeService.deleteEmployee(EmpId).subscribe({
      next:()=>alert('Record Deleted Succefully')
    }
    );
     //remove Employee from Array to render on UI
     let removedObjectIndex = this.employeesArray.findIndex((data)=>data.id===EmpId)
     if(removedObjectIndex!==-1){
       this.employeesArray.splice(removedObjectIndex,1)
     }
     this.destroySubsArray.push(Subs);
  }

  //select updated record
  btnUpdateRecord(EmpId:number){
    this.employeeData=this.employeesArray.find((ele)=>ele.id===EmpId);
    this.hideForm.ishide.next(!this.hideForm.ishide.value);    
  }
  //to post new record
  onAddEmp(){     
      this.employeeData = undefined;
      this.hideForm.ishide.next(!this.hideForm.ishide.value);      
  }
  //destroy subs
  ngOnDestroy(): void {
    this.destroySubsArray.forEach((ele)=>ele.unsubscribe());
  }

}

