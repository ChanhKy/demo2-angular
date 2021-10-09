package com.fpt.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table
public class HeSoTangCa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "he_so_id")
	private int heSoId;
	
	@Column(name = "he_so_value")
	private double heSoValue;
	
	@OneToMany(mappedBy = "heSoTangCa")
	@JsonBackReference
	private Set<Salary> salarys;

	public HeSoTangCa() {
		super();
		// TODO Auto-generated constructor stub
	}

	public HeSoTangCa(double heSoValue, Set<Salary> salarys) {
		super();
		this.heSoValue = heSoValue;
		this.salarys = salarys;
	}

	public int getHeSoId() {
		return heSoId;
	}

	public void setHeSoId(int heSoId) {
		this.heSoId = heSoId;
	}

	public double getHeSoValue() {
		return heSoValue;
	}

	public void setHeSoValue(double heSoValue) {
		this.heSoValue = heSoValue;
	}

	public Set<Salary> getSalarys() {
		return salarys;
	}

	public void setSalarys(Set<Salary> salarys) {
		this.salarys = salarys;
	}
	
	
}
