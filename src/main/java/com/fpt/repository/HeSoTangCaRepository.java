package com.fpt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fpt.entities.HeSoTangCa;

@Repository
public interface HeSoTangCaRepository extends JpaRepository<HeSoTangCa, Integer> {

}
