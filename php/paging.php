<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Credentials:true'); 
	header("Content-Type: application/text;charset=utf-8");
	require_once './connect.php';
	$times = $_POST["times"];
	//echo json_encode($times);
	$count = "SELECT COUNT(*) FROM `topic`";
	if($counts = mysqli_query ( $con, $count ))
	// echo json_encode($counts);
	{
		$r = mysqli_fetch_row($counts);
		$c = $r[0];
	}
	//$showsql = "SELECT * FROM `topic` order by id desc";
	$s = $c-$times*5-10;//16
	$t = 5;
	switch ($s) {
		case '-4':
			$s =0;
			$t =1;
			break;
		case '-3':
			$s =0;
			$t =2;
			break;
		case '-2':
			$s =0;
			$t =3;
			break;
		case '-1':
			$s =0;
			$t =4;
			break;
		default:
			break;
	}
	$showsql = "SELECT * FROM `topic` limit $s,$t";//n-1,m-n
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