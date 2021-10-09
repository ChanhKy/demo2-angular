package com.fpt.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Salary")
public class Salary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "salary_id")
	private int salaryId;
	
	@Column(name = "time_tang_ca")
	private int timeTangCa;
	
	@Column(name = "sum_salary")
	private String sumSalary;
	
	@ManyToOne
	@JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name = "he_so_id", referencedColumnName = "he_so_id")
	private HeSoTangCa heSoTangCa;

	public Salary() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Salary(int salaryId, int timeTangCa, String sumSalary, Employee employee, HeSoTangCa heSoTangCa) {
		super();
		this.salaryId = salaryId;
		this.timeTangCa = timeTangCa;
		this.sumSalary = sumSalary;
		this.employee = employee;
		this.heSoTangCa = heSoTangCa;
	}

	public int getSalaryId() {
		return salaryId;
	}

	public void setSalaryId(int salaryId) {
		this.salaryId = salaryId;
	}

	public int getTimeTangCa() {
		return timeTangCa;
	}

	public void setTimeTangCa(int timeTangCa) {
		this.timeTangCa = timeTangCa;
	}

	public String getSumSalary() {
		return sumSalary;
	}

	public void setSumSalary(String sumSalary) {
		this.sumSalary = sumSalary;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public HeSoTangCa getHeSoTangCa() {
		return heSoTangCa;
	}

	public void setHeSoTangCa(HeSoTangCa heSoTangCa) {
		this.heSoTangCa = heSoTangCa;
	}

	
	
	
	
	
}
