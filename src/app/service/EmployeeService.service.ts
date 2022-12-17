import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from 'src/app/interface/Employee';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

constructor(private httpClient:HttpClient) { }
//handle with json server
//environment.APIEndpoint: its domain name
getAllEmployee():Observable<Employee[]>{
  return this.httpClient.get<Employee[]>(`${environment.APIEndpoint}/Employees`);
}

getEmployeeById(employeeID:number):Observable<Employee>{
 return this.httpClient.get<Employee>(`${environment.APIEndpoint}/Employees/${employeeID}`)
}

addEmployee(employee:Employee):Observable<Employee>
{
 return this.httpClient.post<Employee>(`${environment.APIEndpoint}/Employees`,employee)
}

deleteEmployee(employeeID:number):Observable<Employee>{
 return this.httpClient.delete<Employee>(`${environment.APIEndpoint}/Employees/${employeeID}`);
}
updateEmployeeData(empId:number|undefined,updatedEmployee:Employee):Observable<Employee>
{
 return this.httpClient.put<Employee>(`${environment.APIEndpoint}/Employees/${empId}` , updatedEmployee)
}

}
