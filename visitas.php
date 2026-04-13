<?php

header("Content-Type: application/json");

// archivo JSON
$file = "visitas.json";

// leer datos
$data = json_decode(file_get_contents($file), true);

// fecha actual
$anio = date("Y");
$mes = date("n");
$dia = date("j");

// inicializar si no existe
if (!isset($data["anio"])) {
    $data = [
        "anio" => $anio,
        "mes" => $mes,
        "dia" => $dia,
        "visitas" => [
            "anio_count" => 0,
            "mes_count" => 0,
            "dia_count" => 0
        ]
    ];
}

// RESET AÑO
if ($data["anio"] != $anio) {
    $data["anio"] = $anio;
    $data["mes"] = $mes;
    $data["dia"] = $dia;

    $data["visitas"]["anio_count"] = 0;
    $data["visitas"]["mes_count"] = 0;
    $data["visitas"]["dia_count"] = 0;
}

// RESET MES
if ($data["mes"] != $mes) {
    $data["mes"] = $mes;
    $data["dia"] = $dia;

    $data["visitas"]["mes_count"] = 0;
    $data["visitas"]["dia_count"] = 0;
}

// RESET DÍA
if ($data["dia"] != $dia) {
    $data["dia"] = $dia;

    $data["visitas"]["dia_count"] = 0;
}

// INCREMENTAR
$data["visitas"]["anio_count"]++;
$data["visitas"]["mes_count"]++;
$data["visitas"]["dia_count"]++;

// guardar con bloqueo (IMPORTANTE)
$fp = fopen($file, "w");
flock($fp, LOCK_EX);
fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
flock($fp, LOCK_UN);
fclose($fp);

// devolver solo visitas
echo json_encode($data["visitas"]);

?>