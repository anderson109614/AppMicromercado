<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    /*
    try {
        if (isset($_GET['id']))
        {
        $sql = $dbConn->prepare("SELECT
         id, nro_acta,origen, nro_compromiso, estado, acta_contabilizada, bien_contabilizado, descripcion
         FROM acta WHERE Estado!='Desactivado' and id=:id;");
        $sql->bindValue(':id', $_GET['id']);
        $sql->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode(  $sql->fetch(PDO::FETCH_ASSOC)  );
       
        }
        else {
        $sql = $dbConn->prepare("SELECT
        id, nro_acta,origen, nro_compromiso, estado, acta_contabilizada, bien_contabilizado, descripcion
        FROM acta WHERE Estado!='Desactivado'");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode( $sql->fetchAll()  );
        }
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
    
}

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    try{
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "INSERT INTO `pedido`(`Id_Cliente`, `Fecha`,  `Total`, `Ubicacion`, `Id_Estado`) 
        VALUES (:Id_Cliente, now(),  :Total, :Ubicacion,1)";
        $statement = $dbConn->prepare($sql);
        //bindAllValues($statement, $input,-1);
        $statement->bindValue(':Id_Cliente', $input['Id_Cliente'] );
        $statement->bindValue(':Total', $input['Total'] );
        $statement->bindValue(':Ubicacion', $input['Ubicacion'] );
        
        $statement->execute();
        $postId = $dbConn->lastInsertId();
    
        if($postId)
        {
        $input['Id'] = $postId;
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
      
        }
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
    /*
    try{
        $id = $_GET['id'];
        $statement = $dbConn->prepare("UPDATE acta SET estado='Desactivado' WHERE id=:id"); 
        $statement->bindValue(':id', $id);
        $statement->execute();
        header("HTTP/1.1 200 OK");
        echo 'OK';
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
}
if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    /*
    try{
        $input = $_GET;
        $fields = getParams($input);
        $sql = "UPDATE
        acta 
        SET
        nro_acta=:nro_acta,
        origen=:origen,
        nro_compromiso=:nro_compromiso,
        estado=:estado,
        acta_contabilizada=:acta_contabilizada,
        bien_contabilizado=:bien_contabilizado,
        descripcion=:descripcion
        WHERE id=:id";
        $statement = $dbConn->prepare($sql);
        //$sql->bindValue(':id', $postId);
        bindAllValues($statement, $input,-1);
        $statement->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode($input);
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    */
}

header('Content-type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Headers: *');
ob_end_flush();

?>