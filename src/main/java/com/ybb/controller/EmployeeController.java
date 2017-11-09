package com.ybb.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.ybb.bean.Employee;
import com.ybb.bean.Msg;
import com.ybb.service.EmployeeService;

/**
 * 处理员工CRUD的控制器
 * @author 55482
 *
 */
@Controller
public class EmployeeController {

	@Autowired
	EmployeeService employeeService;
	/**
	 * 导入jackson包
	 * 分页查询员工信息
	 * @param pn
	 * @param model
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("/emps")
	@ResponseBody
	public Msg getEmpWithJosn(@RequestParam(value="pn",defaultValue="1")Integer pn,Model model){
		PageHelper.startPage(pn, 5);
		//startPage后面紧跟的查询就是一个分页查询
		List<Employee> emps=employeeService.getAll();
		//用PageInfo包装查询的结果
		@SuppressWarnings({ "unchecked" })
		//出入连续显示de页数
		PageInfo pageInfo=new PageInfo(emps,5);
		
		return Msg.success().add("pageInfo", pageInfo);
		
	}
	
	/**
	 * 员工保存（并以post方式提交）
	 * JSR303数据校验支持
	 * @return
	 */
	@RequestMapping(value="/emp",method=RequestMethod.POST)
	@ResponseBody
	public Msg saveEmps(@Valid Employee employee,BindingResult result){
		if(result.hasErrors()){
			//封装错误信息
			Map<String, Object> map=new HashMap<String, Object>();
			//校验失败，返回失败,在模态框中显示错误信息
			List<FieldError> error =result.getFieldErrors();
			//便利错误信息
			for(FieldError fieldError :error){
				map.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
			return Msg.fail().add("errorFields", map);
		}else{
			employeeService.saveEmp(employee);
			return Msg.success();
		}
		
	}
	
	/**
	 * 校验用户是否存在
	 * @param empName
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/checkuser")
	public Msg checkUser(@RequestParam("empName")String empName){
		//判断用户名是否合法表达式
		String regName="(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})";
		if(!empName.matches(regName)){
			return Msg.fail().add("va_mag","用户名为2-5个中文或6-16位英文和数字组合");
		}
		//校验数据库用户名是否存在
		boolean b= employeeService.checkUser(empName);
		if(b){
			return Msg.success();
		}else{
			return Msg.fail().add("va_mag","用户名已存在");
		}
	}
	
	/**
	 * 根据id查询员工
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/emp/{id}",method=RequestMethod.GET)
	@ResponseBody
	public Msg getEmp(@PathVariable("id")Integer id){
		Employee employee=employeeService.getEmp(id); 
		return Msg.success().add("emp", employee);
		
	}
	
	/**
	 * 员工更新方法
	 * 如果发送ajax为PUT形式的数据
	 * 封装数据除了ID都为空
	 * 
	 * @param employee
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/emp/{empId}",method=RequestMethod.PUT)
	public Msg uodateEmp(Employee employee){
		employeeService.updateEmp(employee);
		return Msg.success();
		
	}
	/**
	 * 根据id删除员工
	 * 批量删除:1-2-3
	 * 单个删除:1
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/emp/{empId}",method=RequestMethod.DELETE)
	public Msg deleteEmp(@PathVariable("empId")String empId){
		List<Integer> del_ids=new ArrayList<Integer>();
		//如果id包含-  就是多个id 批量删除
		if(empId.contains("-")){
			//将多个id分割成id数组
			String[] str_ids= empId.split("-");
			//便利每一个id
			for(String ids :str_ids){
				del_ids.add(Integer.parseInt(ids));
			}
			employeeService.deleteBatch(del_ids);
			
		}else{
			//单个删除(string转整形)
			Integer id=Integer.parseInt(empId);
			employeeService.deleteEmp(id);
		}
		return Msg.success();
		
	}
	/*//获取所有的员工(分页查询)
	@RequestMapping("/emps")
	public String getEmps(@RequestParam(value="pn",defaultValue="1")Integer pn,Model model){
		//插入分页,传入页码，以及每页5条数据
		PageHelper.startPage(pn, 5);
		//startPage后面紧跟的查询就是一个分页查询
		List<Employee> emps=employeeService.getAll();
		//用PageInfo包装查询的结果
		@SuppressWarnings({ "rawtypes", "unchecked" })
		//出入连续显示de页数
		PageInfo pageInfo=new PageInfo(emps,5);
		model.addAttribute("pageInfo", pageInfo);
		return "list";
		
	}*/
}
