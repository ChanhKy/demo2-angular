package com.fpt.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fpt.entities.Skill;
import com.fpt.repository.SkillReponsitory;
import com.fpt.service.SkillService;

@Service
public class SkillServiceImpl implements SkillService {

	@Autowired
	private SkillReponsitory skillReponsitory;

	@Override
	public Skill saveSkill(Skill skill) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Skill> getAll() {
		return skillReponsitory.findAll();
	}

	@Override
	public Optional<Skill> getSkillById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean updateSkill(Skill skill) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int removeSkill(int id) {
		// TODO Auto-generated method stub
		return 0;
	}

}
