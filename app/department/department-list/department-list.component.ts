import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[];
  department: Department;
  idEdit: number;
  idDelete: number;
  departmentForm: FormGroup;
  searchDepartment: '';

  totalPages: number;
  totalElements: number;

  departmentSearchArg: any = {
    pageNumber: 1,
    pageSize: 5,
    search: "",
    sortBy: 'departmentName',
    sortDirection: 'DESC',
  }

  sortBy(text) {
    if (text = this.departmentSearchArg.sortBy) {
      this.departmentSearchArg.sortDirection = this.departmentSearchArg.sortDirection == 'DESC' ? 'ASC' : 'DESC';

    } else {
      this.departmentSearchArg.sortDirection = 'DESC';
    }
    this.departmentSearchArg.sortBy = text;
    this.getDepartments(this.departmentSearchArg);
  }

  constructor(private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private toasrt: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(object?) {
    // if (object) {
    //   this.departmentSearchArg = object;
    // }
    if(object) {
      this.departmentSearchArg.pageNumber = object.pageNumber
      this.departmentSearchArg.pageSize = object.pageSize

    }

    if (this.searchDepartment) {
      object.search = this.searchDepartment;
    }
    console.log(object);

    this.departmentService.getPaging(this.departmentSearchArg).subscribe(departments => {
      if (departments) {
        this.departments = departments.content;
        this.totalPages = departments.totalPages;
        this.totalElements = departments.totalElements
      } else {
        this.departments = []
      }
    })
  }



  searchAll() {
    this.departmentSearchArg.search = this.searchDepartment;
    this.getDepartments(this.departmentSearchArg);
  }


  employees: Employee[];
  changeId(id: number) {
    this.idDelete = id;
    this.employeeService.findAllEmployeeByDepartmentId(this.idDelete).subscribe(employees => {
      if (employees === null) {
        this.employees = [];
        this.confirmDelete();
      } else {
        this.employees = employees;
        Swal.fire({
          icon: 'error',
          title: 'Oh Nooooooo',
          text: 'The department is containing employees!',
        })
      }
    })
  }
  // deleteModal() {
  //   this.departmentService.deleteDepartment(this.idDelete).subscribe(() => {
  //     this.getDepartments();
  //   })
  // }

  async confirmDelete() {
    let check = true;
    await this.departmentService.getDepartmentByFlagAndId(this.idDelete).toPromise()
      .then(depart => {
        console.log(depart);
        this.department = depart;
      })
      .catch(err => {
        console.log(err);
        if (err.status == 404) {
          check = false;
          Swal.fire({
            title: 'Are you want to reload page?',
            text: "This item was deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reload page !'
          }).then((result) => {
            if (result.isConfirmed) {
              this.getDepartments();
            }
          })
        }
      })
    if (check) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.departmentService.deleteDepartmentByUpdate(this.department).subscribe(
            emp => {
              if (emp == 1) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.getDepartments();
              }
              else if (emp == 0) {
                this.toasrt.error('Employee not exists', ' error');
              }
            },
            err => console.log(err)
          )
        }
      })
    }
  }

  async btnEdit(id: number) {
    let check = true;
    this.idEdit = id;
    await this.departmentService.getDepartmentByFlagAndId(this.idEdit).toPromise()
      .then(depart => {
        console.log(depart);
        this.department = depart;
      })
      .catch(err => {
        console.log(err);
        if (err.status == 404) {
          check = false;
          Swal.fire({
            title: 'Are you want to reload page?',
            text: "This item was deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reload page !'
          }).then((result) => {
            if (result.isConfirmed) {
              this.getDepartments();
            }
          })
        }
      })
    if (check) {
      Swal.fire({
        title: "You won't to edit information? ",
        // text: "You won't to edit information? ",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl(`/department/edit/${this.idEdit}`);
        }
      })
    }
  }

  removeInput() {
    this.searchDepartment = '';
    this.getDepartments();
  }

  selectedAll: any;
  selectAll() {
    for (var i = 0; i < this.departments.length; i++) {
      this.departments[i].isSelected = this.selectedAll;
    }
  }

  checkIfSelected() {
    this.selectedAll = this.departments.every(function (item: any) {
      return item.isSelected == true;
    })
  }

  confirmDeleteMutiple() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't delete mutiple record !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteMutilple();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  deleteMutilple() {
    let idCheck = [];
    $("input[type='checkbox']:checked").each(function () {
      idCheck.push({
        id: $(this).val()
      });
    });
    if(idCheck.length == 0 ) {
      this.toasrt.error('List is empty ', ' warning');
    } else {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't delete mutiple record !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          for (var i = 0; i < idCheck.length; i++) {
            const id = idCheck[i].id;
            console.log("id de xoa : " + id);
            this.departmentService.getDepartmentByFlagAndId(id).subscribe(depart => {
              this.departmentService.deleteDepartmentByUpdate(depart).subscribe(() => {
                this.getDepartments();
              })
            })
          }



          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })


    }
  }
}
