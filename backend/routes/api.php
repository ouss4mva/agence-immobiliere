<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Public
Route::post('/inscription', [AuthController::class, 'inscription']);
Route::post('/connexion', [AuthController::class, 'connexion'])->middleware('throttle:5,1'); // 5 essais par minute

// Utilisateur connecté (token Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/moi', [AuthController::class, 'moi']);
    Route::post('/deconnexion', [AuthController::class, 'deconnexion']);
});
