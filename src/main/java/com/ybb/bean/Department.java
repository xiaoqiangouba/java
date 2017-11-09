package com.ybb.bean;

public class Department {
    private Integer deplId;

    private String deplName;

    public Department(){
    	super();
    }
    
    public Department(Integer deplId, String deplName) {
		super();
		this.deplId = deplId;
		this.deplName = deplName;
	}

	public Integer getDeplId() {
        return deplId;
    }

    public void setDeplId(Integer deplId) {
        this.deplId = deplId;
    }

    public String getDeplName() {
        return deplName;
    }

    public void setDeplName(String deplName) {
        this.deplName = deplName == null ? null : deplName.trim();
    }
}