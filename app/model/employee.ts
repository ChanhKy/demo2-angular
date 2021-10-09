import * as internal from "assert";
import { Department } from "./department";
import { Skill } from "./skill";

export interface Employee {
  employeeId?: number;
  employeeName?: string;
  employeeGender?: string;
  dayOfBirth?: Date;
  employeePhone?: string;
  employeeAddress?: string;
  employeePosition?: string;
  employeeSalary?: string;
  employeeImg?: any;
  department?: Department;
  skills?: Skill [];
  flag?: number;
  isSelected?: boolean;
}
