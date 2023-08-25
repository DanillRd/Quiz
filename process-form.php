<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Получение данных
    $answers = $_POST["answers"];
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    // Формирование строки данных для записи
    $data = "Answers: " . $answers . "\n";
    $data .= "First Name: " . $fname . "\n";
    $data .= "Last Name: " . $lname . "\n";
    $data .= "Email: " . $email . "\n";
    $data .= "Phone: " . $phone . "\n\n";

    // Сохранение данных в файл
    $file = fopen("data.txt", "a");
    fwrite($file, $data);
    fclose($file);

    echo "success";
} else {
    echo "error";
}
?>
