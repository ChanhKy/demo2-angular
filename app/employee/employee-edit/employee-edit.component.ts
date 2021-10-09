import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Builder } from 'selenium-webdriver';
import { Department } from 'src/app/model/department';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';
import * as $ from "jquery"
import { Employee } from 'src/app/model/employee';
import { SkillService } from 'src/app/service/skill.service';
import { Skill } from 'src/app/model/skill';
import { UploadFilesService } from 'src/app/service/uploadFile.service';



@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  departments: Department[];
  skills: Skill[];
  idEdit: number;
  file: File;
  imageURL;

  employeeForm = new FormGroup({
    employeeId: new FormControl(''),
    employeeName: new FormControl(),
    employeeGender: new FormControl(),
    dayOfBirth: new FormControl(),
    employeePhone: new FormControl(),
    employeeAddress: new FormControl(),
    employeePosition: new FormControl(),
    employeeSalary: new FormControl(),
    employeeImg: new FormControl(""),
    department: new FormGroup({
      departmentId: new FormControl()
    })
  })

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router,
    private activedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private skillService: SkillService,
    private fileService: UploadFilesService,
  ) { }

  ngOnInit(): void {
    this.loopFocus();
    this.getSkills();
    this.getDepartments();
    this.activedRouter.paramMap.subscribe((paramMap: ParamMap) => {
      this.idEdit = parseInt(paramMap.get('employeeId'));
      this.employeeService.findById(this.idEdit).subscribe(employee => {
        this.employeeForm = new FormGroup({
          employeeId: new FormControl(employee.employeeId),
          employeeName: new FormControl(employee.employeeName, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 ._]{1,}$")]),
          employeeGender: new FormControl(employee.employeeGender, Validators.required),
          dayOfBirth: new FormControl(employee.dayOfBirth, Validators.required),
          employeePhone: new FormControl(employee.employeePhone, [Validators.required, Validators.pattern("^[0]\\d{9}$")]),
          employeeAddress: new FormControl(employee.employeeAddress, [Validators.required, Validators.maxLength(255)]),
          employeePosition: new FormControl(employee.employeePosition, Validators.required),
          employeeSalary: new FormControl(employee.employeeSalary, [Validators.required, Validators.maxLength(10), Validators.pattern("^[0-9]+$")]),
          employeeImg: new FormControl(""),
          department: new FormGroup({
            departmentId: new FormControl(employee.department.departmentId, Validators.required)
          })
        })
      })
    })
  }

  url : any;
  selectFiles(event:any){
    this.file = event.target.files[0];
    var reader = new FileReader();
		reader.readAsDataURL(this.file);

		reader.onload = (_event) => {
			this.url = reader.result;
		}
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








  updateEmployee(employee) {
    let skills = [];
    (employee as Employee).skills = [];
    $("input[type='checkbox']:checked").each(function () {
      skills.push({
        skillId: $(this).val()
      });
    })
    console.log('day la arr skill' + skills);
    (employee as Employee).skills = skills;
    console.log('id cua skill de update'+employee.skills.skillId);
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.router.navigateByUrl('employee/list');
    })
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('form submited => ok');
      this.fileService.upload(this.file).subscribe(
        (res:any) => {
          let employee = this.employeeForm.value;
          employee.employeeImg = res.message;
          console.log(res)
          this.updateEmployee(employee);
          this.toastr.success('Update employee successfull! ', 'Success', {
            timeOut: 2000
          })
        },
        err => console.log(err)
      )
      // this.updateEmployee();
      // this.toastr.success('Update employee successfull! ', 'Success', {
      //   timeOut: 2000
      // })
    } else {
      this.validateAllFormField(this.employeeForm);
      this.toastr.error('Update employee fail', 'Warning', {
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
  }

  loopFocus() {
    $("#employeeName").on("keydown", function (e) {
      if (e.keyCode == 9) {
        if (e.shiftKey) {
          e.preventDefault();
          $("#btn-edit").focus();
        }
      }
    })

    $("#btn-edit").on("keydown", function (e) {
      if (e.keyCode == 9) {
        if (!e.shiftKey) {
          e.preventDefault();
          $("#employeeName").focus();
        }
      }

    })
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
  get employeeId() {
    return this.employeeForm.get('employeeId');
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
  get employeeImg() {
    return this.employeeForm.get('employeeImg');
  }

  get department() {
    return this.employeeForm.get('department');
  }

  get departmentId() {
    return this.employeeForm.get('department').get('departmentId');
  }

}
