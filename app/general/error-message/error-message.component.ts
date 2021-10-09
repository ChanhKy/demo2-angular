import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  @Input() control: AbstractControl;
  @Input() controlName: string;
  message: string;
  constructor() { }

  ngOnInit() {
  }

  create(control: AbstractControl, nameControl: string) {
    if (control.errors != null) {
      let error = control.errors;
      let message = "";
      let key = Object.keys(error)[0];
      switch (key) {
        case "required":
          message = `${nameControl} is required`;
          break;
        case "minlength":
          message = `${nameControl} should be minimum  ${error.minlength.requiredLength} characters`;
          break;
        case "maxlength":
          message = `${nameControl} should be maximum ${error.maxlength.requiredLength} characters`;
          break;
        case "name":
          message = `${nameControl} should be 3 - 50 characters`;
          break;
        case "partterName":
          message = `${nameControl} enter the letter`;
          break;
          case "partterNameDepart":
          message = `${nameControl} enter character, digits,and ._/+#   `;
          break;
        case "partterPhone":
          message = `${nameControl} Enter 10 digits - starting with 0`;
          break;
        case "partterSalary":
          message = `${nameControl} under 10 digits `;
          break;
        case "duplicateDepartmentName":
          message = `${nameControl} is existed`;
          break;
        case "duplicateEmployeeName":
          message = `${nameControl} is existed`;
          break;
        case "birthday":
          message = `${nameControl} should be less than current data`
          break;
      }
      return message;
    }

  }

  ngDoCheck() {
    this.message = this.create(this.control, this.controlName);
  }


}
