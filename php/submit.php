<?php
	header('Access-Control-Allow-Origin:*');
	header('Access-Control-Allow-Methods:POST');
	header('Access-Control-Allow-Credentials:true');
	header("Content-Type: application/text;charset=utf-8");
	if(!isset($_POST["content"])||empty($_POST["content"])||!isset($_POST["from"])||empty($_POST["from"])||!isset($_POST["to"])||empty($_POST["to"])){
		$json= array(
    		'success'=>'false',
    		'msg'=>'记得填全一点哦~'
		);
		$json=json_encode($json);
		echo $json;
		return ;
	}
	require_once './connect.php';
	$time=date("Y-m-d H:i:s", time ());
	$a = $_POST['content'];
        $to = $_POST['to'];
        $from = $_POST['from'];
        $to = strip_tags($to);
        $from = strip_tags($from);
        $comment = strip_tags($a);
	$submitsql = "INSERT INTO `double_one`.`topic` (`id`, `content`, `to`, `from`, `nice`, `time`) VALUES (NULL, '$comment', '$to', '$from', '0', '$time')";
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
				'success'=>'false',
				'msg'=>'提交失败'
		);
		$json=json_encode($json);
		echo $json;
	}
?>
