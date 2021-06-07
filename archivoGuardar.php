<?php
  $archivo = fopen("archivo.arff", 'w');
  fwrite($archivo, str_replace("@@@", PHP_EOL, $_GET["datos"]));
  fclose($archivo);
  echo "1";
?>
