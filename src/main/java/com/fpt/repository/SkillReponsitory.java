package com.fpt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpt.entities.Skill;
@Repository
public interface SkillReponsitory extends JpaRepository<Skill, Integer> {

}
