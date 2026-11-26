<?php

use App\Http\Controllers\Api\Admin\LocationAdminController;
use App\Http\Controllers\Api\Admin\PhotoAdminController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RegionController;
use App\Http\Controllers\Api\TypeBienController;
use App\Http\Controllers\Api\VilleController;
use Illuminate\Support\Facades\Route;

// ----- Public -----
Route::post('/inscription', [AuthController::class, 'inscription']);
Route::post('/connexion', [AuthController::class, 'connexion'])->middleware('throttle:5,1');

Route::get('/regions', [RegionController::class, 'index']);
Route::get('/villes', [VilleController::class, 'index']);
Route::get('/types-bien', [TypeBienController::class, 'index']);

// ----- Utilisateur connecté -----
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/moi', [AuthController::class, 'moi']);
    Route::post('/deconnexion', [AuthController::class, 'deconnexion']);

    // ----- Admin (agence) -----
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/locations', [LocationAdminController::class, 'index']);
        Route::post('/locations', [LocationAdminController::class, 'store']);
        Route::get('/locations/{id}', [LocationAdminController::class, 'show']);
        Route::put('/locations/{id}', [LocationAdminController::class, 'update']);
        Route::patch('/locations/{id}/statut', [LocationAdminController::class, 'statut']);
        Route::delete('/locations/{id}', [LocationAdminController::class, 'destroy']);

        Route::post('/biens/{id}/photos', [PhotoAdminController::class, 'store']);
        Route::patch('/photos/{id}/principale', [PhotoAdminController::class, 'principale']);
        Route::delete('/photos/{id}', [PhotoAdminController::class, 'destroy']);
    });
});
