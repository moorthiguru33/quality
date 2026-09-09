<?php
/**
 * Quality Auto's TVS - cPanel Backend API & Image Uploader
 * Saves content directly to server JSON and handles real file uploads to /uploads/
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataFile = __DIR__ . '/site_data.json';
$uploadDir = __DIR__ . '/uploads/';

// Ensure uploads folder exists
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Action router
$action = isset($_GET['action']) ? $_GET['action'] : '';

// 1. GET DATA
if ($action === 'get_data' || ($_SERVER['REQUEST_METHOD'] === 'GET' && empty($action))) {
    if (file_exists($dataFile)) {
        echo file_get_contents($dataFile);
    } else {
        echo json_encode(['status' => 'empty', 'message' => 'No custom data file found, using defaults']);
    }
    exit;
}

// 2. SAVE DATA (JSON payload)
if ($action === 'save_data' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);

    if ($decoded) {
        $saved = file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        if ($saved !== false) {
            echo json_encode(['success' => true, 'message' => 'Data saved successfully to cPanel server!']);
        } else {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Permission error: Cannot write to site_data.json. Ensure directory has write permissions (chmod 755).']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON input']);
    }
    exit;
}

// 3. UPLOAD IMAGE FILE
if ($action === 'upload_image' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'No image uploaded or upload error occurred.']);
        exit;
    }

    $file = $_FILES['image'];
    $allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    $fileMime = mime_content_type($file['tmp_name']);

    if (!in_array($fileMime, $allowedMimes)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Only JPG, PNG, and WebP images are allowed.']);
        exit;
    }

    // Generate safe filename
    $ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $newFilename = 'qa_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . strtolower($ext);
    $targetPath = $uploadDir . $newFilename;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        $publicUrl = 'uploads/' . $newFilename;
        echo json_encode([
            'success' => true,
            'url' => $publicUrl,
            'filename' => $newFilename
        ]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'error' => 'Failed to move uploaded file to /uploads/ folder.']);
    }
    exit;
}

echo json_encode(['status' => 'active', 'server' => 'cPanel PHP API']);
