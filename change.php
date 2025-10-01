<?php
require "../configdb.php";

try {
    $typeMonitor = $_POST['typeMonitor'] ?? '';
    $n_hospital = $_POST['n_hospital'] ?? '';
    $n_department = $_POST['n_department'] ?? '';
    $headLeft = $_POST['head_left'] ?? '';
    $headRight = $_POST['head_right'] ?? '';
    $listLeft = $_POST['list_left'] ?? '';
    $listRight = $_POST['list_right'] ?? '';
    $amountLeft = $_POST['amount_left'] ?? '';
    $amountRight = $_POST['amount_right'] ?? '';
    // $arr_l = isset($_POST['arr_l']) ? 'true' : 'false';
    // $arr_r = isset($_POST['arr_r']) ? 'true' : 'false';
    $arr_l = $_POST['arr_l'];
    $arr_r = $_POST['arr_r'];
    $urgent_color = $_POST['urgent_color'];
    // $stem_surname = isset($_POST['stem_surname']) ? 'true' : 'false';
    // $stem_surname_table = isset($_POST['stem_surname_table']) ? 'true' : 'false';
    $stem_surname_table = $_POST['stem_surname_table'];
    $stem_surname_popup = $_POST['stem_surname_popup'];
    $status_patient = $_POST['status_patient'];
    $status_check = $_POST['status_check'];
    $urgent_level = $_POST['urgent_level'];
    $lock_position = $_POST['lock_position'];
    $lock_position_right = $_POST['lock_position_right'];
    $stem_name = $_POST['stem_name'];
    $a_sound = $_POST['a_sound'];
    $b_sound = $_POST['b_sound'];
    $c_sound = $_POST['c_sound'];
    $stem_surname = $_POST['stem_surname'];
    $time_col = $_POST['time_col'];
    $station_left = $_POST['station_left'] ?? '';
    $station_right = $_POST['station_right'] ?? '';
    $queryLeft = $_POST['query_left'] ?? '';
    $queryRight = $_POST['query_right'] ?? '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $sql = "UPDATE setting 
        SET department = :n_department, 
        n_hospital = :n_hospital, 
        n_table = :headLeft,
        n_room = :headRight,
        n_listtable = :listLeft,
        n_listroom = :listRight,
        amount_boxL = :amount_left,
        amount_boxR = :amount_right,
        urgent_level = :urgent_level,
        status_patient = :status_patient,
        status_check = :status_check,
        table_arr = :arr_l,
        table_arr2 = :arr_r,
        time_col = :time_col,
        department_load = :queryLeft,
        department_room_load = :queryRight,
        stem_surname = :stem_surname,
        stem_surname_table = :stem_surname_table,
        lock_position = :lock_position,
        lock_position_right = :lock_position_right,
        stem_popup = :stem_surname_popup,
        stem_name = :stem_name,
        urgent_color = :urgent_color,
        a_sound = :a_sound,
        b_sound = :b_sound,
        c_sound = :c_sound,
        station_l = :station_left,
        station_r = :station_right
        WHERE id = :typeMonitor";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":n_department", $n_department);
        $stmt->bindParam(":n_hospital", $n_hospital);
        $stmt->bindParam(":headLeft", $headLeft);
        $stmt->bindParam(":headRight", $headRight);
        $stmt->bindParam(":listLeft", $listLeft);
        $stmt->bindParam(":listRight", $listRight);
        $stmt->bindParam(":amount_left", $amountLeft);
        $stmt->bindParam(":amount_right", $amountRight);
        $stmt->bindParam(":arr_l", $arr_l);
        $stmt->bindParam(":arr_r", $arr_r);
        $stmt->bindParam(":time_col", $time_col);
        $stmt->bindParam(":queryLeft", $queryLeft);
        $stmt->bindParam(":queryRight", $queryRight);
        $stmt->bindParam(":stem_surname", $stem_surname);
        $stmt->bindParam(":stem_surname_table", $stem_surname_table);
        $stmt->bindParam(":stem_surname_popup", $stem_surname_popup);
        $stmt->bindParam(":lock_position", $lock_position);
        $stmt->bindParam(":status_patient", $status_patient);
        $stmt->bindParam(":status_check", $status_check);
        $stmt->bindParam(":lock_position_right", $lock_position_right);
        $stmt->bindParam(":urgent_level", $urgent_level);
        $stmt->bindParam(":stem_name", $stem_name);
        $stmt->bindParam(":urgent_color", $urgent_color);
        $stmt->bindParam(":a_sound", $a_sound);
        $stmt->bindParam(":b_sound", $b_sound);
        $stmt->bindParam(":c_sound", $c_sound);
        $stmt->bindParam(":station_left", $station_left);
        $stmt->bindParam(":station_right", $station_right);
        $stmt->bindParam(":typeMonitor", $typeMonitor);

        if ($stmt->execute()) {
            echo "Record updated successfully";
        } else {
            echo "Error updating record";
        }
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>