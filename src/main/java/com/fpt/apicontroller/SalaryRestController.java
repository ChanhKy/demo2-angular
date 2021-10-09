package com.fpt.apicontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.entities.Salary;
import com.fpt.service.SalaryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/salary")
public class SalaryRestController {

	@Autowired
	private SalaryService salaryService;

	@GetMapping(value = "/list")
	public ResponseEntity<List<Salary>> showAllSalary() {
		System.out.println("alo");
		List<Salary> list = salaryService.findAll();
		if (list.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Salary>>(list, HttpStatus.OK);
	}

	@PostMapping(value = "/create")
	public ResponseEntity<Salary> saveSalary(@RequestBody Salary salary) {
		return new ResponseEntity<Salary>(salaryService.saveSalary(salary), HttpStatus.OK);
	}

}
