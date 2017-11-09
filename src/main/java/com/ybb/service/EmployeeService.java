package com.ybb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.ybb.bean.Employee;
import com.ybb.bean.EmployeeExample;
import com.ybb.bean.EmployeeExample.Criteria;
import com.ybb.dao.EmployeeMapper;

@Service
public class EmployeeService {

	@Autowired
	EmployeeMapper employeeMapper;
	//查询所有员工
	public List<Employee> getAll() {
		return employeeMapper.selectByExampleWithDepl(null);
	}
	//保存员工信息
	public void saveEmp(Employee employee) {
		// TODO Auto-generated method stub
		employeeMapper.insertSelective(employee);
	}
	/**
	 * 校验员工姓名是否存在
	 * @param empName
	 * @return  true:代表可用，false：代表不可用
	 */
	public boolean checkUser(String empName) {
		//构造查询条件
		EmployeeExample employeeExample=new EmployeeExample();
		Criteria criteria=employeeExample.createCriteria();
		criteria.andEmpNameEqualTo(empName);
		//条件查询
		long count=employeeMapper.countByExample(employeeExample);
		return count==0;
	}
	
	/**
	 * 按照员工id查询员工信息
	 * @param id
	 * @return
	 */
	public Employee getEmp(Integer id) {
		// TODO Auto-generated method stub
		Employee employee=employeeMapper.selectByPrimaryKey(id);
		return employee;
	}
	
	/**
	 * 员工更新
	 * @param employee
	 */
	public void updateEmp(Employee employee) {
		// TODO Auto-generated method stub
		employeeMapper.updateByPrimaryKeySelective(employee);
	}
	
	/**
	 * 单个删除员工
	 * @param empId
	 */
	public void deleteEmp(Integer empId) {
		// TODO Auto-generated method stub
		employeeMapper.deleteByPrimaryKey(empId);
	}
	
	/**
	 * 批量删除
	 * @param str_ids
	 */
	public void deleteBatch(List<Integer> str_ids) {
		// TODO Auto-generated method stub
		//创建删除条件
		EmployeeExample employeeExample=new EmployeeExample();
		Criteria criteria=employeeExample.createCriteria();
		//delete from xxx where empId in{1,2,3...}
		criteria.andEmpIdIn(str_ids);
		//条件删除
		employeeMapper.deleteByExample(employeeExample);
		
	}

}
