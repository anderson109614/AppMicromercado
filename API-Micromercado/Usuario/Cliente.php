<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);


if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
      	
           $sql = $dbConn->prepare("
				SELECT * FROM cliente;
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
        $sql = "INSERT INTO `cliente`(
            `Cedula`,
            `Nombre`,
            `Apellido`,
            `Telefono`,
            `Celular`,
            `Direccion`,
            `Ubicacion`,
            `Contrasena`,
            `Email`
        )
        VALUES(
            :Cedula,
            :Nombre,
            :Apellido,
            :Telefono,
            :Celular,
            :Direccion,
            :Ubicacion,
            :Contrasena,
            :Email
        )";
        $statement = $dbConn->prepare($sql);
        $statement->bindValue(':Cedula', $input['Cedula']);
        $statement->bindValue(':Nombre', $input['Nombre']);
        $statement->bindValue(':Apellido', $input['Apellido']);
        $statement->bindValue(':Telefono', $input['Telefono']);
        $statement->bindValue(':Celular', $input['Celular']);
        $statement->bindValue(':Direccion', $input['Direccion']);
        $statement->bindValue(':Ubicacion', $input['Ubicacion']);
        $statement->bindValue(':Contrasena', $input['Contrasena']);
        $statement->bindValue(':Email', $input['Email']);
              
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