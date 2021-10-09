package com.fpt.service;

import java.util.List;
import java.util.Optional;

import com.fpt.entities.Skill;


public interface SkillService {

	Skill saveSkill(Skill skill);
	List<Skill> getAll();
	Optional<Skill> getSkillById(int id);
	boolean updateSkill(Skill skill);
	int removeSkill(int id);
}
