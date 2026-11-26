<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\BienLocationRequest;
use App\Http\Resources\BienResource;
use App\Models\Bien;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LocationAdminController extends Controller
{
    private const RELATIONS = ['typeBien', 'ville', 'photos'];

    // Seuls les biens en LOCATION sont accessibles ici
    private function trouver(int $id): Bien
    {
        return Bien::location()->with(self::RELATIONS)->findOrFail($id);
    }

    /** GET /api/admin/locations */
    public function index()
    {
        return BienResource::collection(
            Bien::location()->with(self::RELATIONS)->latest()->limit(100)->get()
        );
    }

    /** GET /api/admin/locations/{id} */
    public function show(int $id)
    {
        return new BienResource($this->trouver($id));
    }

    /** POST /api/admin/locations */
    public function store(BienLocationRequest $request): JsonResponse
    {
        $donnees = $request->validated();
        $donnees['statut'] ??= 'DISPONIBLE';
        $donnees['est_vedette'] ??= false;

        $bien = new Bien($donnees);
        $bien->type_operation = 'LOCATION';
        $bien->created_by = $request->user()->id;
        $bien->save();

        return (new BienResource($bien->load(self::RELATIONS)))->response()->setStatusCode(201);
    }

    /** PUT /api/admin/locations/{id} */
    public function update(BienLocationRequest $request, int $id)
    {
        $bien = $this->trouver($id);
        $bien->update($request->validated());

        return new BienResource($bien->fresh(self::RELATIONS));
    }

    /** PATCH /api/admin/locations/{id}/statut */
    public function statut(Request $request, int $id)
    {
        $donnees = $request->validate(
            ['statut' => ['required', 'in:DISPONIBLE,RESERVE,LOUE']],
            ['statut.in' => 'État invalide.']
        );

        $bien = $this->trouver($id);
        $bien->update($donnees);

        return new BienResource($bien->fresh(self::RELATIONS));
    }

    /** DELETE /api/admin/locations/{id} */
    public function destroy(int $id): JsonResponse
    {
        $bien = $this->trouver($id);

        if ($bien->statut === 'LOUE') {
            return response()->json([
                'message' => "Ce bien est actuellement loué : changez d'abord son état avant de le supprimer.",
            ], 409);
        }

        foreach ($bien->photos as $photo) {
            $photo->supprimerFichier();
        }
        $bien->delete();

        return response()->json(['message' => 'Bien supprimé.']);
    }
}
