import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent implements OnInit {

  employee: Employee;
  idView: number;
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.activeRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.idView = parseInt(paramMap.get('employeeId'));

      this.employeeService.findById(this.idView).subscribe(employee => {
        this.employee = employee;
        if (this.employee.employeeImg == null || this.employee.employeeImg == "") {
          this.employee.employeeImg = environment.URL_IMAGE_DEFAULT;
        } else {
          this.employee.employeeImg = environment.URL_IMAGE + "/" + this.employee.employeeImg;

        }
        console.log(this.employee);
      })
    })

  }








}
