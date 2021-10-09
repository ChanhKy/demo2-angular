package com.fpt.service;

import java.util.List;

import com.fpt.entities.HeSoTangCa;

public interface HeSoTangCaService {
	HeSoTangCa saveSalary(HeSoTangCa heSoTangCa);
	List<HeSoTangCa> findAll();
}
