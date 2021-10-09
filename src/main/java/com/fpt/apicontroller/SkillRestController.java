package com.fpt.apicontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fpt.entities.Skill;
import com.fpt.service.SkillService;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping(value = "/skill")
public class SkillRestController {

	@Autowired
	private SkillService skillService;
	
	@GetMapping(value = "/list")
	public ResponseEntity<List<Skill>> showListDepartment() {
		List<Skill> skills = skillService.getAll();
		if (skills.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(skills, HttpStatus.OK);
	}
}
