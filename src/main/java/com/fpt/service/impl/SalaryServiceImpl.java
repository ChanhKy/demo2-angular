package com.fpt.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fpt.entities.Salary;
import com.fpt.repository.SalaryRepository;
import com.fpt.service.SalaryService;

@Service
@Transactional
public class SalaryServiceImpl implements SalaryService {

	@Autowired
	private SalaryRepository salaryRepository;

	@Override
	public Salary saveSalary(Salary salary) {
		return salaryRepository.save(salary);
	}

	@Override
	public List<Salary> findAll() {
		System.out.println("123");
		return salaryRepository.findAll();
	}

}
