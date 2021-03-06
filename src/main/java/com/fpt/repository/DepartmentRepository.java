/* 
 * Project: DepartmentRepository.java
 * Version: 1.0
 * Date: Sep 20, 2021
 * Copyright 2021
 * Modification: 
 * Date				Author				Description
 * --------------------------------------------------
 * Sep 20, 2021		KyNC6				Create
 */

package com.fpt.repository;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fpt.entities.Department;
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {

	@Query(value = " FROM Department d "
			+ "WHERE (d.departmentName LIKE ?1 "
			+ "OR d.departmentId LIKE ?1 ) AND d.flag = False"
			)
	Page<Department> searchByString(String str, Pageable page);
	
	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "DELETE FROM Department WHERE departmentId =?1")
	int deleteByIDWithNumber(int id);
	
	@Query(value = "FROM Department WHERE departmentName = ?1")
	Department getDepartmentByName(String name);
	
	@Modifying(clearAutomatically = true, flushAutomatically = true)
	@Query(value = "Update Department SET flag = true WHERE departmentId = ?1")
	int deleteDepartmentByUpdate(int id);
	
	Page<Department> findAllByFlagFalse(Pageable pageable);
	
	
	Optional<Department> findByDepartmentIdAndFlagFalse(int id);
}

