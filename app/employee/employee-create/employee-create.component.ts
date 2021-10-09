import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, PatternValidator, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import * as $ from "jquery"
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  departments: Department[];
  employeeForm: FormGroup;
  skills: Skill[];


  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private toastr: ToastrService,
    private skillService: SkillService,
  ) { }

  ngOnInit() {
    this.loopFocus();
    this.getDepartments();
    this.getSkills();
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(),
      employeeName: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ._]{1,}$")]),
      employeeGender: new FormControl("", Validators.required),
      dayOfBirth: new FormControl("", Validators.required),
      employeePhone: new FormControl("", [Validators.required, Validators.pattern("^[0]\\d{9}$")]),
      employeeAddress: new FormControl("", [Validators.required, Validators.maxLength(255)]),
      employeePosition: new FormControl("", Validators.required),
      employeeSalary: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+$")]),
      department: new FormGroup({
        departmentId: new FormControl("", Validators.required)
      }
      ),
    })
  }


  inputName: string;
  empl: Employee;
  checkDuplicate(name: string) {
    this.employeeService.getEmployeeByName(name).subscribe(employee => {
      this.empl = employee;
      if (this.empl != null) {
        // this.toastr.error('Name has dupcate', 'error');
        this.employeeName.setErrors({ duplicateEmployeeName: true })
      }
      if (!(name as string).match("^[a-zA-Z0-9 ._]{1,}$")) {
        this.employeeName.setErrors({ partterName: true })
      }
    })
  }
  checkPhone(text:string) {
    if (!(text as string).match("^[0]\\d{9}$")) {
      this.employeePhone.setErrors({ partterPhone: true })
    }
  }
  checkSalary(text:string) {
    if (!(text as string).match("^[0-9]+$")) {
      this.employeeSalary.setErrors({ partterSalary: true })
    }
  }


  getDepartments() {
    this.departmentService.getAllDepartment().subscribe(departments => {
      this.departments = departments;
    })
  }

  getSkills() {
    this.skillService.getAllSkill().subscribe(skills => {
      this.skills = skills;
    })
  }
  get employeeName() {
    return this.employeeForm.get('employeeName');
  }

  get employeeGender() {
    return this.employeeForm.get('employeeGender');
  }

  get dayOfBirth() {
    return this.employeeForm.get('dayOfBirth');
  }

  get employeePhone() {
    return this.employeeForm.get('employeePhone');
  }

  get employeeAddress() {
    return this.employeeForm.get('employeeAddress');
  }

  get employeePosition() {
    return this.employeeForm.get('employeePosition');
  }

  get employeeSalary() {
    return this.employeeForm.get('employeeSalary');
  }

  get department() {
    return this.employeeForm.get('department');
  }

  get departmentId() {
    return this.employeeForm.get('department').get('departmentId');
  }

  saveEmployee() {
    const employee = this.employeeForm.value;
    let skills = [];
    $("input[type='checkbox']:checked").each(function () {
      skills.push({
        skillId: $(this).val()
      });
    });
    console.log(skills);

    (employee as Employee).skills = skills;
    console.log("check skills: ", employee);

    this.employeeService.saveEmployee(employee).subscribe(() => {
      this.router.navigateByUrl('employee/list')
    }, e => {
      console.log(e);
      alert("Create fail :(  ");
    })
  }

  onSubmit() {
    if (this.employeeForm.valid) {

      console.log('form submited => ok');
      this.saveEmployee();
      this.toastr.success('Add employee successfull! ', 'Success', {
        timeOut: 2000
      })
      // Swal.fire("Add employee successfull!", "You clicked the button", "success");
    } else {
      this.validateAllFormField(this.employeeForm);
      // Swal.fire("Add employee error! ", "You clicked the button", "error");
      this.toastr.error('Add employee fail', 'Warning', {
        timeOut: 2000
      });
    }
  }


  validateAllFormField(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        // console.log('field nay dang bi loi' + field);
        control.markAllAsTouched();////////////
      } else if (control instanceof FormGroup) {
        this.validateAllFormField(control);
      }
    })
  }

  resetForm() {
    this.employeeForm.reset();
    this.getDepartments();
  }

  loopFocus() {
    $("#employeeName").on("keydown", function (e) {
      if (e.keyCode == 9) {
        if (e.shiftKey) {
          e.preventDefault();
          $("#btn-add").focus();
        }
      }
    })

    $("#btn-add").on("keydown", function (e) {
      if (e.keyCode == 9) {
        if (!e.shiftKey) {
          e.preventDefault();
          $("#employeeName").focus();
        }
      }

    })
  }


}
