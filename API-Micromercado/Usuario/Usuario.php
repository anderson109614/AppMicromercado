<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
      	
           $sql = $dbConn->prepare("
				SELECT Email FROM cliente WHERE Email=:email;
           ");
           $sql->bindValue(':email', $_GET['mail']);
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
        $sql = "SELECT  `Id`,
  `Cedula`,
  `Nombre`,
  `Apellido`,
  `Telefono`,
  `Celular`,
  `Direccion`,
  CONCAT('http://micromercadoand.atwebpages.com/img/',Foto) as Foto,
  `Ubicacion`,
  `Contrasena`,
  `Email`
         FROM `cliente` WHERE `Email`=:Email and `Contrasena`=:Contrasena";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':Email', $input['Email']);
        $statement->bindValue(':Contrasena', $input['Contrasena']);
              
        // bindAllValues($statement, $input,-1);
        $statement->execute();
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($statement->fetchAll());
        
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