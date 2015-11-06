<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/text;charset=utf-8");
	require_once './connect.php';
	$showsql = "SELECT * FROM `topic` order by id desc";
	// echo $showsql;
	if ($query=mysqli_query ( $con, $showsql )) {
		if ($query && mysqli_num_rows ( $query )) {
			while ( $row = mysqli_fetch_assoc ( $query ) ){
				$result[] = $row;
			}
		echo json_encode($result);
		}
	} else {
		$json= array(
				'success'=>'ture',
				'msg'=>'提交失败'
		);
		$json=json_encode($json);
		echo $json;
	}
?>