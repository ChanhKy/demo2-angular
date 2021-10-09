package com.fpt.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table (name = "Skill")
public class Skill {

	@Id
	@Column(name = "skill_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int skillId;
	
	@Column(name = "skill_name", columnDefinition = "Nvarchar(50)")
	private String skillName;

	@ManyToMany(mappedBy = "skills")
//	@JoinColumn(name = "employee_id", referencedColumnName = "employee_id")
	@JsonBackReference
	private Set<Employee> employees;

	public Skill() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Skill(int skillId, String skillName, Set<Employee> employees) {
		super();
		this.skillId = skillId;
		this.skillName = skillName;
		this.employees = employees;
	}

	public int getSkillId() {
		return skillId;
	}

	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public Set<Employee> getEmployees() {
		return employees;
	}

	public void setEmployees(Set<Employee> employees) {
		this.employees = employees;
	}

	
	
	
	
	
}
