package com.fpt.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fpt.entities.HeSoTangCa;
import com.fpt.repository.HeSoTangCaRepository;
import com.fpt.service.HeSoTangCaService;

@Service
@Transactional
public class HeSoTangCaServiceImpl implements HeSoTangCaService{

	@Autowired
	private HeSoTangCaRepository heSoTangCaRepository;
	@Override
	public HeSoTangCa saveSalary(HeSoTangCa heSoTangCa) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<HeSoTangCa> findAll() {
		return heSoTangCaRepository.findAll();
	}

}
