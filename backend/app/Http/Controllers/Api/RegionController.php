<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\RegionResource;
use App\Models\Region;

class RegionController extends Controller
{
    public function index()
    {
        return RegionResource::collection(Region::orderBy('nom')->get());
    }
}
