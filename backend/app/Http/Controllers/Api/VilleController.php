<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\VilleResource;
use App\Models\Ville;
use Illuminate\Http\Request;

class VilleController extends Controller
{
    public function index(Request $request)
    {
        return VilleResource::collection(
            Ville::with('region')
                ->when($request->region_id, fn ($q, $id) => $q->where('region_id', $id))
                ->orderBy('nom')->get()
        );
    }
}
