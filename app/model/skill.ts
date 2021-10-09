import {Employee} from './employee'
 export interface Skill {
  skillId?:number;
  skillName?:string;
  employee?: Employee;
}
