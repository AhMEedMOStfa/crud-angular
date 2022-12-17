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
  employeesArray!:Employee[];
  employeeData:Employee | undefined;
  destroySubsArray:Subscription[] = [];
  constructor(private employeeService:EmployeeServiceService , public hideForm:HideFormService) { }

  ngOnInit() {
    let Subs = this.employeeService.getAllEmployee().subscribe(
      {
        next:(employeesData)=> this.employeesArray = employeesData
      }
    )        
    this.destroySubsArray.push(Subs); 
  }
  //add employee method
  postUpdateEmployee(emp:Employee){
    if(!this.employeeData)
    {
      this.employeesArray.push(emp);    
    }
    else
    {
      this.employeesArray.forEach((val,i)=>{
        (i ==emp.id!-1)?this.employeesArray[i] = emp:''
      })
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
  btnUpdateRecord(EmpId:number){
    let Subs=this.employeeService.getEmployeeById(EmpId).subscribe({
      next:(empDetails)=>{
        this.employeeData = empDetails;
        if(this.employeeData){
          this.hideForm.ishide.next(!this.hideForm.ishide.value);
        }
    }   
    }
    )
  this.destroySubsArray.push(Subs);
  }
  onAddEmp(){     
      this.employeeData = undefined;
      this.hideForm.ishide.next(!this.hideForm.ishide.value);
  }
  
  ngOnDestroy(): void {
    this.destroySubsArray.forEach((ele)=>ele.unsubscribe());
  }

}

