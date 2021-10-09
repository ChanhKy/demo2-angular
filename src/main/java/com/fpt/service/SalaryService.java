package com.fpt.service;

import java.util.List;

import com.fpt.entities.Salary;

public interface SalaryService {

	Salary saveSalary(Salary salary);
	List<Salary> findAll();
}
