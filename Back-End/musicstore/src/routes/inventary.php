<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

//Obtener todos los inventarios
$app->get('/api/inventary/searchall', function(Request $request, Response $response){
    $consulta = "SELECT * FROM inventary";
    try{
        // Instanciar la base de datos
        $db = new db();

        // Conexión
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $inventary = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en formato JSON
        echo json_encode($inventary);

    } catch(PDOException $e){
        echo '{"Error": {"Code": 400, "Response": "'.$e->getMessage().'"}}';
    }
});

//Obtener un solo inventario
$app->get('/api/inventary/search/{id}', function(Request $request, Response $response){

    $id = $request->getAttribute('id');

    $consulta = "SELECT * FROM inventary WHERE id='$id'";
    try{
        // Instanciar la base de datos
        $db = new db();

        // Conexión
        $db = $db->conectar();
        $ejecutar = $db->query($consulta);
        $inventary = $ejecutar->fetchAll(PDO::FETCH_OBJ);
        $db = null;

        //Exportar y mostrar en formato JSON
        echo json_encode($inventary);
        
    } catch(PDOException $e){
        echo '{"Error": {"Code": 400, "Response": "'.$e->getMessage().'"}}';
    }
});


// Agregar Inventario
$app->post('/api/inventary/save', function(Request $request, Response $response){
    $nombre             = $request->getParam('nombre');
    $tipo               = $request->getParam('tipo');
    $fecha_creacion     = $request->getParam('fecha_creacion');
    $referencia         = $request->getParam('referencia');
    $cantidad           = $request->getParam('cantidad');
   
   
    
    $consulta = "INSERT INTO inventary (nombre, tipo, fecha_creacion, referencia, cantidad) VALUES
                                      (:nombre, :tipo, :fecha_creacion, :referencia, :cantidad)";
    try{
        // Instanciar la base de datos
        $db = new db();

        // Conexión
        $db = $db->conectar();
        $stmt = $db->prepare($consulta);
        $stmt->bindParam(':nombre',                  $nombre);
        $stmt->bindParam(':tipo',                    $tipo);
        $stmt->bindParam(':fecha_creacion',          $fecha_creacion);
        $stmt->bindParam(':referencia',              $referencia);
        $stmt->bindParam(':cantidad',                $cantidad);
        $stmt->execute();
        echo '{"Info": {"Code": 200, "Reponse": "Transaccion Exitosa"}}';
    } catch(PDOException $e){
        echo '{"Error": {"Code": 400, "Response": "'.$e->getMessage().'"}}';
    }
});


// Actualizar Instrumento
$app->put('/api/inventary/edit/{id}', function(Request $request, Response $response){
    $id             = $request->getAttribute('id');
    $nombre         = $request->getParam('nombre');
    $tipo           = $request->getParam('tipo');
    $fecha_creacion = $request->getParam('fecha_creacion');
    $referencia     = $request->getParam('referencia');  
    $cantidad       = $request->getParam('cantidad');
   


     $consulta = "UPDATE inventary SET
				nombre 	         = :nombre,
				tipo 	         = :tipo,
                fecha_creacion   = :fecha_creacion,
                referencia       = :referencia,
                cantidad	     = :cantidad

			WHERE id = $id";


    try{
        // Instanciar la base de datos
        $db = new db();

        // Conexion
        $db = $db->conectar();
        $stmt = $db->prepare(               $consulta);
        $stmt->bindParam(':nombre',         $nombre);
        $stmt->bindParam(':tipo',           $tipo);
        $stmt->bindParam(':fecha_creacion', $fecha_creacion);
        $stmt->bindParam(':referencia',     $referencia);     
        $stmt->bindParam(':cantidad',       $cantidad);
        $stmt->execute();
        echo '{"Info": {"Code": 200, "Reponse": "Instrumento Actualizado Exitosamente"}}';
    } catch(PDOException $e){
        echo '{"Error": {"Code": 400, "Response": "'.$e->getMessage().'"}}';
    }
});


// Borrar Registro
$app->delete('/api/inventary/delete/{id}', function(Request $request, Response $response){
    $id = $request->getAttribute('id');
    $sql = "DELETE FROM inventary WHERE id = $id";
    try{
        // Instanciar la base de datos
        $db = new db();

        // Conexion
        $db = $db->conectar();
        $stmt = $db->prepare($sql);
        $stmt->execute();
        $db = null;
        echo '{"Info": {"Code": 200, "Reponse": "Registro Eliminado Correctamente"}}';
    } catch(PDOException $e){
        echo '{"Error": {"Code": 400, "Response": "'.$e->getMessage().'"}}';
    }
});