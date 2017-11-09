package com.ybb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ybb.bean.Department;
import com.ybb.dao.DepartmentMapper;
@Service
public class DepartmentService {

	@Autowired
	private DepartmentMapper departmentMapper;
	
	public List<Department> getDepars() {
		// TODO Auto-generated method stub
		
		return departmentMapper.selectByExample(null);
	}

}
