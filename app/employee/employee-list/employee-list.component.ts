import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, ShowOnDirtyErrorStateMatcher, Sort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';
import * as $ from "jquery"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee;
  IdEdit: number;
  IdDelete: number;
  searchEmployee = '';

  totalPages: number;
  totalElements: number;

  employeeSearchArg: any = {
    pageNumber: 1,
    pageSize: 5,
    search: "",
    sortBy: 'employeeName',
    sortDirection: 'DESC',
  }

  sortBy(text) {
    console.log("ok");

    if (text == this.employeeSearchArg.sortBy) {
      this.employeeSearchArg.sortDirection = this.employeeSearchArg.sortDirection == 'DESC' ? 'ASC' : 'DESC';
    } else {
      this.employeeSearchArg.sortDirection = 'DESC';
    }
    this.employeeSearchArg.sortBy = text;
    this.getEmployees(this.employeeSearchArg);
  }

  constructor(private employeeService: EmployeeService,
    private toasrt: ToastrService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loopFocus();
    this.getEmployees();
  }

  getEmployees(object?) {
    if(object) {
      this.employeeSearchArg.pageNumber = object.pageNumber
      this.employeeSearchArg.pageSize = object.pageSize

    }
    console.log(this.employeeSearchArg);

    if (this.searchEmployee) {
      this.employeeSearchArg.search = this.searchEmployee;
    }
    this.employeeService.getPaging(this.employeeSearchArg).subscribe(employees => {
      if (employees) {
        this.employees = employees.content;
        this.totalPages = employees.totalPages;
        this.totalElements = employees.totalElements;
      } else {
        this.employees = [];
      }
    })
  }

  searchAll() {
    this.employeeSearchArg.search = this.searchEmployee;
    this.getEmployees(this.employeeSearchArg);
  }

  changeId(id: number) {
    this.IdDelete = id;
    console.log(this.IdDelete);
    if (this.IdDelete == null) {
      this.toasrt.error('Employee not exists', ' error');
    } else {
      // this.confirmDelete();
      this.deleteEmp();
    }
  }

  async deleteEmp() {
    let check = true;
    await this.employeeService.getEmployeeByFlagAndId(this.IdDelete).toPromise()
      .then(emp => {
        console.log(emp);
        this.employee = emp;
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
              this.getEmployees();
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
          this.employeeService.deleteEmployeeByUpdate(this.employee).subscribe(
            emp => {
              if (emp == 1) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                this.getEmployees();
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
    this.IdEdit = id;
    let check = true;
    await this.employeeService.getEmployeeByFlagAndId(this.IdEdit).toPromise()
      .then(emp => {
        this.employee = emp;
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
              this.getEmployees();
            }
          })
        }
      })
    if (check) {
      Swal.fire({
        title: "You won't to edit information?",
        // text: "You won't to edit information?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl(`/employee/edit/${this.IdEdit}`);
        }
      })
    }

  }


  // async confirmDelete() {
  //   let check = true;
  //   await this.employeeService.findById(this.IdDelete).toPromise()
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       if (err.status == 404) {
  //         check = false;
  //         Swal.fire({
  //           title: 'Are you want to reload page?',
  //           text: "This item was deleted!",
  //           icon: 'warning',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3085d6',
  //           cancelButtonColor: '#d33',
  //           confirmButtonText: 'Yes, reload page !'
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             this.getEmployees();
  //           }
  //         })
  //       }
  //     })
  //   if (check) {
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.employeeService.deleteEmployee(this.IdDelete).subscribe(
  //           emp => {
  //             if (emp == 1) {
  //               Swal.fire(
  //                 'Deleted!',
  //                 'Your file has been deleted.',
  //                 'success'
  //               )
  //               this.getEmployees();
  //             }
  //             else if (emp == 0) {
  //               this.toasrt.error('Employee not exists', ' error');
  //             }
  //           },
  //           err => console.log(err)
  //         )
  //       }
  //     })
  //   }
  // }
  loopFocus() {
    $("#search").on("keydown", function (e) {
      if (e.keyCode == 9) {
        if (e.shiftKey) {
          e.preventDefault();
          $("#btn-delete").focus();
        }
      }
    })

    $("#btn-delete").on("keydown", function (e) {
      if (e.keyCode == 9) {
        if (!e.shiftKey) {
          e.preventDefault();
          $("#search").focus();
        }
      }
    })
  }


  removeInput() {
    this.searchEmployee = '';
    this.getEmployees();
  }
  selectedAll: any;
  selectAll() {
    for (var i = 0; i < this.employees.length; i++) {
      this.employees[i].isSelected = this.selectedAll;
    }
  }

  checkIfSelected() {
    this.selectedAll = this.employees.every(function (item: any) {
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
      this.toasrt.error('List is empty ', ' warning',  {
        timeOut: 1500
      });
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
            this.employeeService.getEmployeeByFlagAndId(id).subscribe(emp => {
              this.employeeService.deleteEmployeeByUpdate(emp).subscribe(() => {
                this.getEmployees();
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
