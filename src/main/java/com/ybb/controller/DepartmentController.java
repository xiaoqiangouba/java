package com.ybb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ybb.bean.Department;
import com.ybb.bean.Msg;
import com.ybb.service.DepartmentService;

/**
 * 处理Department控制器
 * @author 55482
 *
 */
@Controller
public class DepartmentController {

	@Autowired
	private DepartmentService  departmentService;
	/**
	 * 返回所有的部门信息
	 */
	
	@RequestMapping("/depts")
	@ResponseBody
	public Msg getDepartment(){
		//获取部门信息
		List<Department> list=departmentService.getDepars();
		
		return Msg.success().add("depts", list);
		
	}
}
