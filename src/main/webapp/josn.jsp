<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/jquery-3.0.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/js/indexJs.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<link href="${pageContext.request.contextPath}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
	    <!-- 修改员工跳出框 -->
		<div class="modal fade" id="updateEmps" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" >员工修改</h4>
		      </div>
		           <div class="modal-body">
			        	<form class="form-horizontal" id="update_form">
							  <div class="form-group">
							     <label  class="col-sm-2 control-label">员工姓名</label>
							       <div class="col-sm-10">
							           <p class="form-control-static" id="empName_uodate"></p>
							          <span class="help-block"></span>
							       </div>
							  </div>
							  <div class="form-group">
							     <label  class="col-sm-2 control-label">员工邮箱</label>
							       <div class="col-sm-10">
							          <input type="text"  name="empEmall" class="form-control" id="userEmail_input_update" placeholder="userEmail">
							      	  <span class="help-block"></span>
							       </div>
							  </div>
							  <div class="form-group">
							     <label  class="col-sm-2 control-label">部门名</label>
							     <div class="col-sm-4">
							     <!-- 提交的部门名 -->
							          <select class="form-control" name="dId" id="dept_update"></select>
							     </div>
								 
							  </div>
						</form>
		           </div>
				   <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				        <button type="button" class="btn btn-primary" id="update_emp_but">更新</button>
				   </div>
		    </div>
	    </div>
	    </div>
		<!-- 新增员工跳出框 -->
		<div class="modal fade" id="addEmps" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		        <h4 class="modal-title" id="myModalLabel">员工添加</h4>
		      </div>
		           <div class="modal-body">
			        	<form class="form-horizontal" id="sava_form">
							  <div class="form-group">
							     <label  class="col-sm-2 control-label">员工姓名</label>
							       <div class="col-sm-10">
							          <input type="text" name="empName" class="form-control" id="empName_input" placeholder="userName">
							          <span class="help-block"></span>
							       </div>
							  </div>
							  <div class="form-group">
							     <label  class="col-sm-2 control-label">员工邮箱</label>
							       <div class="col-sm-10">
							          <input type="text"  name="empEmall" class="form-control" id="userEmail_input" placeholder="userEmail">
							      	  <span class="help-block"></span>
							       </div>
							  </div>
							  <div class="form-group">
							     <label  class="col-sm-2 control-label">部门名</label>
							     <div class="col-sm-4">
							     <!-- 提交的部门名 -->
							          <select class="form-control" name="dId" id="dept_select"></select>
							     </div>
								 
							  </div>
						</form>
		           </div>
				   <div class="modal-footer">
				        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				        <button type="button" class="btn btn-primary" id="save_emp_but">提交</button>
				   </div>
		    </div>
	    </div>
     </div>

     <!-- 显示员工信息 -->
     <div class="container">	
      
          <!-- 标题 -->
          <div class="row">
          		<div class="col-md-12">
          			<h1>SSM-CURD</h1>
          		</div>
          </div>
          <!-- 按钮 -->
          <div class="row">
          		<div class="col-md-4 col-md-offset-8">
                	<button class="btn btn-primary" id="but_add">新增</button>
                	<button class="btn btn-danger" id="emp_delete_all">删除</button>
                </div>
          </div>
          <!-- 显示数据 -->
          <div class="row">
          		<div class="col-md-12">
          			<table class="table table-hover" id="emp_table">
          				<thead>
          					<tr>
          						<th>
          							<input type="checkbox" id="check_all"/>
          						</th>
          						<th>#</th>
          						<th>姓名</th>
          						<th>邮箱</th>
          						<th>部门</th>
          						<th>操作</th>
          					</tr>
          				</thead>
          				<tbody>
          					
          				</tbody>
          			</table>
          		</div>
          </div>
          <!-- 显示分页信息 -->
          <div class="row">
          		<!-- 分页信息 -->
          		<div class="col-md-6" id="page_info">
          			
          		</div>
          		<!-- 分页条 -->
          		<div class="col-md-6" id="page_nav">
					
				</div>
          </div>
      </div>
      
      
      
</body>
</html>