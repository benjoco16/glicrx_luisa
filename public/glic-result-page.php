<?php
  foreach ($_POST as $key => $value) {
    echo "Field ".htmlspecialchars($key)." is ".htmlspecialchars($value)."<br>";
  }
  $callername = isset($_POST['caller_name']) ? $_POST['caller_name'] : '';
  $ndcode = isset($_POST['ndcode']) ? $_POST['ndcode'] : '';
  $dtype = isset($_POST['DrugType']) ? $_POST['DrugType'] : '';
  $formtype = isset($_POST['FormType']) ? $_POST['FormType'] : '';
  $dosagetype = isset($_POST['Dosage']) ? $_POST['Dosage'] : '';
  $qtytype = isset($_POST['qty']) ? $_POST['qty'] : '';
  $ziptype = isset($_POST['getzipcode']) ? $_POST['getzipcode'] : '';
  
  //this input is for resultpage.js to call getDrugComponents function()
  echo '<input type="hidden" value="'.$callername.'" id="drug_result_input">';

  /*
  if($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo $dtype;
    echo $formtype;
    echo $dosagetype;
    echo $qtytype;
    echo $ziptype;
  }
  */
  echo '<div id="glicupdatehldr">';
    include('resultpage/glic-update-drug.php');
    include('resultpage/glic-pharmacy.php');
  echo '</div>';
?>
