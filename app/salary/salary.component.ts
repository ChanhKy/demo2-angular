import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_LOCALE_PROVIDER } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { HesotangcaService } from '../service/hesotangca.service';
import { SalaryService } from '../service/salary.service';


@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  salaryForm: FormGroup;
  employees;
  heSoTangCas;
  toTalTime;
  toTolOvertimeSalary = 0;
  totalSalary;

  constructor(
    private salaryService: SalaryService,
    private employeeService: EmployeeService,
    private heSoTangCaService: HesotangcaService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getEmployee();
    this.getHeSoTangCa();
    this.salaryForm = new FormGroup({
      salaryId: new FormControl(),
      timeTangCa: new FormControl(),
      sumSalary: new FormControl(),
      employee: new FormGroup({
        employeeId: new FormControl(),
        employeeName: new FormControl(),
        employeeSalary: new FormControl()
      }),
      heSoTangCa: new FormGroup({
        heSoId: new FormControl(),
        heSoValue: new FormControl()
      })
    })
  }

  getEmployee() {
    this.employeeService.findAllFlagFalse().subscribe(employees => {
      this.employees = employees;
    })
  }

  getHeSoTangCa() {
    this.heSoTangCaService.getAll().subscribe(hesotangcas => {
      this.heSoTangCas = hesotangcas;
    })
  }

  get employeeSalary() {
    return this.salaryForm.get('employee').get('employeeSalary');
  }

  get sumSalary() {
    return this.salaryForm.get('sumSalary');
  }


  get heSoValue() {
    return this.salaryForm.get('heSoTangCa').get('heSoValue');
  }

  get heSoId() {
    return this.salaryForm.get('heSoTangCa').get('heSoId');
  }


  tinhluong() {
    if(this.heSoId.value) {
      let value = this.heSoTangCas.find(x => x.heSoId == this.heSoId.value).heSoValue;

      // tính lương tăng ca
      let salaryPartTime = this.toTalTime * value;
      let employeeId = this.salaryForm.get('employee').get('employeeId').value;
      console.log(employeeId);


      let employeeSalary = this.employees.find(x => x.employeeId == employeeId).employeeSalary
      console.log(employeeSalary);

      this.toTolOvertimeSalary = salaryPartTime * 1;
      this.totalSalary = employeeSalary * 1 + salaryPartTime * 1;
    }
  }



  onSubmit() {

    if (this.salaryForm) {
      const salary = this.salaryForm.value;
      this.salaryService.saveSalary(salary).subscribe(() => {
        this.toastr.success('Add employee successfull! ', 'Success', {
          timeOut: 1000
        })
      })
    }
  }





  resetForm() {
    this.salaryForm.reset();
    this.getEmployee();
    this.getHeSoTangCa();
  }
}
