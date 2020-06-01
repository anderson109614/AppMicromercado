<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
      	
           $sql = $dbConn->prepare("
           SELECT
           *
       FROM
           categoriaprod 
       
           ");
           
            $sql->execute();
	        $sql->setFetchMode(PDO::FETCH_OBJ);
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
     		
 		
	
				
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
}


if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    try {
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "UPDATE `cliente` SET `Foto`=:foto ";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':foto', $input['imgen']);
        
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
        
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }

}


header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
ob_end_flush(); 
?>