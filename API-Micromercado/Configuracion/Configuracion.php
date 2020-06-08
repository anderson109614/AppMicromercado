<?php
ob_start();
include("../coneccion.php");
$dbConn =  connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    
    try {
        if (isset($_GET['Id']))
        {
            /*
        $sql = $dbConn->prepare("SELECT
        p.Fecha,
        p.Total,
        e.Nombre,
        e.Color
    FROM
        pedido p,
        estado e
    WHERE
        p.Id_Estado=e.Id
        and p.Id_Cliente=:Id");
        $sql->bindValue(':Id', $_GET['Id']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode( $sql->fetchAll()  );
       */
        }
        else {
            
        $sql = $dbConn->prepare("SELECT * FROM `configuracion`");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode( $sql->fetchAll()  );
        
        }
    } catch (Exception $e) {
        echo 'Excepción capturada: ',  $e->getMessage(), "\n";
    }
    
    
}

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    /*    try{
        //$input = $_POST;
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        $sql = "INSERT INTO `pedido_det`(
            `Id_Det_Prod`,
            `Id_Pedido`,
            `Cantidad`
        )
        VALUES(
            :Id_Det_Prod,
            :Id_Pedido,
            :Cantidad 
        )";
        $statement = $dbConn->prepare($sql);
        //bindAllValues($statement, $input,-1);
        $statement->bindValue(':Id_Det_Prod', $input['Id_Det_Prod'] );
        $statement->bindValue(':Id_Pedido', $input['Id_Pedido'] );
        $statement->bindValue(':Cantidad', $input['Cantidad'] );
        
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
    }*/
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
header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
header('Access-Control-Allow-Headers: *');
ob_end_flush();

?>