<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/text;charset=utf-8");
	if(!isset($_POST["content"])||empty($_POST["content"])||!isset($_POST["from"])||empty($_POST["from"])||!isset($_POST["to"])||empty($_POST["to"])){
		$json= array(
    		'success'=>'false',
    		'msg'=>'参数错误，内容不能为空'
		);
		$json=json_encode($json);
		echo $json;
		return ;
	}
	require_once './connect.php';
	$time=date("Y-m-d H:i:s", time ());
	$submitsql = "INSERT INTO `double_one`.`topic` (`id`, `content`, `to`, `from`, `nice`, `time`) VALUES (NULL, '$_POST[content]', '$_POST[to]', '$_POST[from]', '0', '$time')";
	// echo $submitsql;
	if (mysqli_query ( $con, $submitsql )) {
		$id=mysqli_insert_id($con);
		$json= array(
				'success'=>'ture',
				'msg'=>'提交成功',
				'id'=>$id
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