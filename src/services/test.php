<?php

$html = file_get_contents('https://dekode.no/kontakt/');


$employees = preg_match_all('/src="(.*?)".*?avatar avatar-500 photo/',$html, $results);

echo json_encode($results);