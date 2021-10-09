import { Employee } from "./employee";
import { HeSoTangCa } from "./heSoTangCa";


export interface Salary {
  salaryId? : number;
  timeTangCa? :number;
  sumSalary? : number;
  employee?: Employee;
  heSoTangCa?: HeSoTangCa
}
