<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TypeBienResource;
use App\Models\TypeBien;

class TypeBienController extends Controller
{
    public function index()
    {
        return TypeBienResource::collection(TypeBien::orderBy('libelle')->get());
    }
}
