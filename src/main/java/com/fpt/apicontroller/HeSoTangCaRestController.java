package com.fpt.apicontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.entities.HeSoTangCa;
import com.fpt.service.HeSoTangCaService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/hesotangca")
public class HeSoTangCaRestController {

	@Autowired
	private HeSoTangCaService heSoTangCaService;

	@GetMapping(value = "/list")
	public ResponseEntity<List<HeSoTangCa>> showAllSalary() {
		System.out.println("alo");
		List<HeSoTangCa> list = heSoTangCaService.findAll();
		if (list.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<HeSoTangCa>>(list, HttpStatus.OK);
	}

	
}
