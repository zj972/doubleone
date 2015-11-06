<?php
	//点赞
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/text;charset=utf-8");
	if(!isset($_POST["nice"])||!isset($_POST["id"])){
		$json= array(
    		'success'=>'false',
    		'msg'=>'参数错误，内容不能为空'
		);
		$json=json_encode($json);
		echo $json;
		return ;
	}
	require_once './connect.php';
	$nicesql = "UPDATE `double_one`.`topic` SET `nice` = '$_POST[nice]' WHERE `topic`.`id` = $_POST[id]";
	// echo $nicesql;
	if (mysqli_query ( $con, $nicesql )) {
		$json= array(
				'success'=>'ture',
				'msg'=>'提交成功'
		);
		$json=json_encode($json);
		echo $json;
	} else {
		$json= array(
				'success'=>'ture',
				'msg'=>'提交失败'
		);
		$json=json_encode($json);
		echo $json;
	}
?>