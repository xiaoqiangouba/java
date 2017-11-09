package com.ybb.bean;

import javax.validation.constraints.Pattern;

public class Employee {
	
    private Integer empId;

    //自定义校验规则
    @Pattern(regexp="(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})",message="用户名为2-5个中文或6-16位英文和数字组合")
    private String empName;

    @Pattern(regexp="^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$",message="邮箱格式不正确")
    private String empEmall;

    private Integer dId;
    
    private Department department;
    
    public Employee(){
    	super();
    }
    public Employee(Integer empId, String empName, String empEmall, Integer dId) {
		super();
		this.empId = empId;
		this.empName = empName;
		this.empEmall = empEmall;
		this.dId = dId;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName == null ? null : empName.trim();
    }

    public String getEmpEmall() {
        return empEmall;
    }

    public void setEmpEmall(String empEmall) {
        this.empEmall = empEmall == null ? null : empEmall.trim();
    }

    public Integer getdId() {
        return dId;
    }

    public void setdId(Integer dId) {
        this.dId = dId;
    }
}