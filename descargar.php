<?php
  header('Content-Disposition: attachment; filename=archivo.arff');
  header ('Content-Type: application/octet-stream');
  echo file_get_contents ("archivo.arff");
?>
