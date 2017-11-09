window.onload = function(){ 
	var pathName=window.document.location.pathname;
	var pathUrl=pathName.substring(0,pathName.substr(1).indexOf('/')+1);

  // 总记录数和当前页面
    var totalNmbuer,currentPage;
    //1.页面加载完成以后，直接去发送一个ajxa请求，要到分页数据
    $(function(){
  	  //去首页
  	  to_page(1);
    });
    
    //分页跳转
    function to_page(pn){
  	  $.ajax({
  		  url:pathUrl+"/emps",
  		  data:"pn="+pn,
  		  type:"GET",
  		  success:function(result){
  			  //1.解析员工信息
  			   build_emps_table(result);
  			  //2.解析分页信息
  			  build_pag_info(result);
  			  //3.解析分页条
  			  build_pag_nav(result)
  		  }
  	  });
  	  
    }
    
    //解析员工信息
    function build_emps_table(result){
  	  //清空表格数据
  	   $("#emp_table tbody").empty();
  	   var emps=result.extend.pageInfo.list;
  	  $.each(emps,function(index,item){
  		 //添加复选框
  		 var checkBoxId=$("<td><input type='checkbox' class='check_item'/></td>");
  		 var empid=$("<td></td>").append(item.empId);
  		 var empname=$("<td></td>").append(item.empName); 
  		 var empemall=$("<td></td>").append(item.empEmall); 
  		 var deplname=$("<td></td>").append(item.department.deplName);
  		 //添加编辑按钮
  		 var edibtn=$("<button></button>").addClass("btn btn-primary btn-sm update_btn")
  		             .append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
  		 //为编辑按钮添加一个自定义属性来记录id
  		 edibtn.attr("emp-id",item.empId);
  		 //添加删除按钮
  		 var delbtn=$("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
                      .append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
  		 
  		 //为删除按钮添加id
  		 delbtn.attr("emp-id",item.empId);
  		 var btntd=$("<td></td>").append(edibtn).append(" ").append(delbtn);
  		 //append方法执行完成以后还是返回原来的元素
  		 $("<tr></tr>").append(checkBoxId).append(empid).append(empname).append(empemall).append(deplname)
  		 .append(btntd)
  		 .appendTo("#emp_table tbody");
  		 ;
  	  });
    }
    
    
    //解析分页信息
    function build_pag_info(result){
  	//清空数据
  	  $("#page_info").empty();
  	  $("#page_info").append("当前"+result.extend.pageInfo.pageNum +"页,总"+result.extend.pageInfo.pages +"共页,总"+result.extend.pageInfo.total+"记录");
  	 //记录总数
  	  totalNmbuer=result.extend.pageInfo.pages;
  	  //记录当前页数
  	  currentPage=result.extend.pageInfo.pageNum;
    }
    
    //解析分页条
    function build_pag_nav(result){
  	  //清空数据
  	   $("#page_nav").empty();
  	  //page_nav
  	  var ul=$("<ul></ul>").addClass("pagination");
      	//构造控件
  	  var firstPage=$("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
  	  var perPage=$("<li></li>").append($("<a></a>").append("&laquo;"));
  	  //当前为第一页，那首页和上一页无法点击
		//alert(result.extend.pageInfo.hasPreviousPage);
		//是否有上一页
  	  if(result.extend.pageInfo.hasPreviousPage==false){
  		  firstPage.addClass("disabled");
  		  perPage.addClass("disabled");
  	  }else{
  		//为控件添加点击事件（点击首页跳转第一页）
     	   firstPage.click(function(){
     		   to_page(1)
     	   });
     	 //  点击上一页，跳转到当前页面减一
     	   perPage.click(function(){
     		   to_page(result.extend.pageInfo.pageNum-1)
     	   });
  	  }
  	  
  	  //构造控件（下一页）
  	  var nextPage=$("<li></li>").append($("<a></a>").append("&raquo;"));
  	  //尾页
  	  var lastPage=$("<li></li>").append($("<a></a>").append("尾页").attr("href","#"));
  	  //如果当前是最后一页，就无法点击下一页后尾页
  	  if(result.extend.pageInfo.hasNextPage==false){
  		  nextPage.addClass("disabled");
  		  lastPage.addClass("disabled");
  	  }else{
  		  //为控件添加点击事件（当前页面加一）
      	  nextPage.click(function(){
      		   to_page(result.extend.pageInfo.pageNum+1)
      	   });
      	  lastPage.click(function(){
      		  //跳到最后一页
     		      to_page(result.extend.pageInfo.pages)
     	       });
  		  
  	  }
  	  
  	  //添加首页跟前一页
  	  ul.append(firstPage).append(perPage);
  	  //便利页码号result.extend.pageInfo.navigatepageNums==1,2,3.4,5
  	  //所有页码
		//alert(result.extend.pageInfo.navigatepageNums);
  	  $.each(result.extend.pageInfo.navigatepageNums,function(index,item){
  		  //item是依次被便利出来的1，2，3，4，5页码
  		  var numli=$("<li></li>").append($("<a></a>").append(item));
  		  //如果当前被便利出来的页码等于被点击页数，加一个蓝色标记
  		  if(result.extend.pageInfo.pageNum==item){
  			  numli.addClass("active");
  		  }
  		  
  		  numli.click(function(){
  			  to_page(item) 
  		  });
  		  ul.append(numli);
  	  });
  	  //便利完了添加下一页和尾页
  	  ul.append(nextPage).append(lastPage);
  	  //将ul添加到nav中
  	  var nav=$("<nav></nav>").append(ul);
  	  //将nav添加到id为page_nav的div中 
  	  nav.appendTo("#page_nav");
    }
    
    //清除表单所以信息，包括验证消息
    function reset_form(ele){
  	  //清空下拉列表
		  $("#dept_select").empty();
  	  $(ele)[0].reset();
  	  $(ele).find("*").removeClass("has-success has-error");
  	  $(ele).find(".help-block").text("");
    }
    
    //点击新增按钮弹出框
    $("#but_add").click(function(){
  	  //清除表单所以信息，包括验证消息
  	   reset_form("#addEmps form");
  	  //发送ajax请求显示部门信息,显示在下拉列表中
  	  getDepts("#dept_select");
  	  //弹出框
  	  $("#addEmps").modal({
  		  backdrop:"static"
  	  });
    });
    
    //查出部门信息显示在下拉列表中
    function getDepts(ele){
  	  $.ajax({
  		  url:pathUrl+"/depts",
  		  type:"GET",
  		  success:function(result){
  			//dept_select
  			//{code: 100, msg: "处理成功", extend: {depts: [{deplId: 1, deplName: "开发部"}, {deplId: 2, deplName: "测试部"}]}}
  			//$.each(result.extend.dep);
  			$.each(result.extend.depts,function(){
  				var optionDep=$("<option></option>").append(this.deplName).attr("value",this.deplId);
  				optionDep.appendTo(ele);
  			});
  		  }
  	  });
    }
    
    //校验表单数据
    function validate_add_for(){
  	  //拿到要要校验的员工姓名
  	 var empName= $("#empName_input").val();
  	 var regNmae=/(^[a-zA-Z0-9_-]{6,16}$)|(^[\u2E80-\u9FFF]{2,5})/;
  	 if(!regNmae.test(empName)){
  		 //alert("用户名为2-5个中文或6-16位英文和数字组合");
  		 show_msg("#empName_input","error","用户名为2-5个中文或6-16位英文和数字组合");
  		 return false;
  	 }else{
  		 show_msg("#empName_input","success","");
  	 };
  	 //校验邮箱
  	 var empEamli=$("#userEmail_input").val();
  	 var regEamli=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  	 if(!regEamli.test(empEamli)){
  		// alert("邮箱格式不正确");
  		 show_msg("#userEmail_input","error","邮箱格式不正确");
  		 /* $("#userEmail_input").parent().addClass("has-error");
  		 $("#userEmail_input").next("span").text("邮箱格式不正确"); */
  		 return false;
  	 }else{
  		 show_msg("#userEmail_input","success","");
  		 /* $("#userEmail_input").parent().addClass("has-success");
  		 $("#userEmail_input").next("span").text(""); */
  	 }
  	 return true;
    }
    
    //校验方法
    function show_msg(ele,status,msg){
  	//清空原来的样式
  	 $(ele).parent().removeClass("has-success has-error");
  	 $(ele).next("span").text("");
  	  if("success"==status){
  		//找到其父元素
  		 $(ele).parent().addClass("has-success");
   		 $(ele).next("span").text(msg);
  	  }else if("error"==status){
  		 $(ele).parent().addClass("has-error");
   		 $(ele).next("span").text(msg); 
  	  }
    }
    
    //校验用户名是否可用
    $("#empName_input").change(function(){
  	  //发送ajax请求校验校验用户名是否可用
  	  var empName=this.value;
  	  $.ajax({
  		url:pathUrl+"/checkuser",  
  		data:"empName="+empName,
  		type:"POST",
  		success:function(result){
  			if(result.code==100){
  				show_msg("#empName_input","success","用户名可用");
  				$("#save_emp_but").attr("ajax-va","success");
  			}else{
  				show_msg("#empName_input","error",result.extend.va_mag);
  				$("#save_emp_but").attr("ajax-va","error");
  			}
  		}
  	  });
    });
  	  
   
    
    //保存员工信息
    $("#save_emp_but").click(function(){
  	  //校验员工名是否合法
  	  if(!validate_add_for()){
  		  return false;
  	  }
  	  //校验用户名是否存在
  	  if($(this).attr("ajax-va")=="error"){
  		  return false;
  	  };
  	  //提交表单信息
  	  //发送ajax请求保存信息
  	  $.ajax({
  		  url:pathUrl+"/emp",
  		  type:"POST",
  		  data:$("#sava_form").serialize(),
  		  success:function(result){
  			  
  			  if(result.code==100){
  				//关闭显示框，并来带最后一页显示出来
      			  $("#addEmps").modal('hide');
      			  //发送ajax到最后一页
      			  to_page(totalNmbuer);
      			  //清空所有表单
      			 
      			  $("#dept_select").empty();
      			  
  			  }else{
  				  //显示错误信息
  				  if(undefined !=result.extend.errorFields.empEmall){
  					  //显示邮箱错误信息
  					  show_msg("#userEmail_input","error",result.extend.errorFields.empEmall);
  				  }
  				  if(undefined !=result.extend.errorFields.empName){
  					  //显示姓名错误信息
  					  show_msg("#empName_input","error",result.extend.errorFields.empName);
  				  }
  			  }
  			  
  		  }
  	  });
    });
    
    //为后面加载的编辑按钮绑定点击事件
    $(document).on("click",".update_btn",function(){
  	  //在模态框弹出之前查出用户信息
  	   //1.清空下拉列表信息,并查出部门信息
  	   $("#dept_update").empty();
  	   getDepts("#dept_update");
  	  //2.查出员工信息
  	  getEmp($(this).attr("emp-id"));
  	  
  	  //3.将员工id传递给更新按钮
  	  $("#update_emp_but").attr("emp-id",$(this).attr("emp-id"));
  	  //弹出模态框
  	  $("#updateEmps").modal({
  		  backdrop:"static"
  	  });
    });
  	
    //为删除按钮添加一个点击事件(单个)
    $(document).on("click",".delete_btn",function(){
  	  //获取员工姓名
  	  var empName=$(this).parents("tr").find("td:eq(2)").text();
  	  //获取员工id
  	  var empId=$(this).attr("emp-id");
  	  if(confirm("确认删除"+empName+"员工吗？")){
  		  //发送ajax请求删除员工
      	  $.ajax({
      		  url:pathUrl+"/emp/"+empId,
      		  type:"DELETE",
      		  success:function(result){
      			  alert(result.msg);
      			  //回到当前页面
      			  to_page(currentPage);
      			  
      		  }
      		  
      	  });
  	  }
    });
    
  //在模态框弹出之前查出用户信息
  function getEmp(id){
  	$.ajax({
  		url:pathUrl+"/emp/"+id,
  		type:"GET",
  		success:function(result){
  			var empDate=result.extend.emp;
  			$("#empName_uodate").text(empDate.empName);
  			$("#userEmail_input_update").val(empDate.empEmall);
  			$("#dept_update").val([empDate.dId]);
  		}
  	});
  }
  
  //为更新按钮绑定点击事件
  $("#update_emp_but").click(function(){
  	 //1.校验邮箱是否合法
  	 var empEamli=$("#userEmail_input_update").val();
  	 var regEamli=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  	 if(!regEamli.test(empEamli)){
  		 show_msg("#userEmail_input_update","error","邮箱格式不正确");
  		 return false;
  	 }else{
  		 show_msg("#userEmail_input_update","success","");
  	 }
  	 
  	 //2.发送ajax请求
  	 $.ajax({
  		 url:pathUrl+"/emp/"+$(this).attr("emp-id"),
  		 type:"PUT",
  		 data:$("#update_form").serialize(),
  		 success:function(result){
  			 //1.关闭模态框
  			 $("#updateEmps").modal("hide");
  			 //2.回到本页
  			 to_page(currentPage);
  		 }
  	 });
  });
  
  //完成全选/全不选
  $("#check_all").click(function(){
  	//prop(选中复选框就是ture 没选中就是false)
  	$(".check_item").prop("checked",$(this).prop("checked"));
  	
  });
  
  //.check_item为单个全选添加点击事件
  $(document).on("click",".check_item",function(){
  	//判断当前元素是否选择完成,全部选满是ture 否则是fals
  	var flag=$(".check_item:checked").length==$(".check_item").length;
  	$("#check_all").prop("checked",flag);
  });
  
  //多选删除  批量删除
  $("#emp_delete_all").click(function(){
  	var empNames="";
  	var dele_idstr="";
  	//便利选中的单选框
  	$.each($(".check_item:checked"),function(){
  		//获取其父元素tr下边的第三个td元素的值（员工的姓名）
  		empNames+=$(this).parents("tr").find("td:eq(2)").text()+",";
  		//组装员工的id
  		dele_idstr+=$(this).parents("tr").find("td:eq(1)").text()+"-";
  	});
  	if(!$.trim(empNames)){
  		alert("请勾选删除的员工");
  	}else{
  		//去除多余的逗号
      	empNames=empNames.substring(0, empNames.length-1);
      	//去除多余的-
      	dele_idstr=dele_idstr.substring(0, dele_idstr.length-1);
      	if(confirm("确认删除"+empNames+"这些员工吗?")){
      		//发送ajax请求
      		$.ajax({
      			url:pathUrl+"/emp/"+dele_idstr,
      			type:"DELETE",
      			success:function(result){
      				alert(result.msg);
      				//回到当前页面
      				to_page(currentPage);
      				
      			}
      		});
      	}
  		
  	}
  });
} 

   