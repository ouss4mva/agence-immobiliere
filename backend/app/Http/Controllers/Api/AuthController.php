<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ConnexionRequest;
use App\Http\Requests\InscriptionRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /** POST /api/inscription : crée un compte CLIENT et le connecte directement */
    public function inscription(InscriptionRequest $request): JsonResponse
    {
        $donnees = $request->safe()->except(['password_confirmation', 'accepte_conditions']);

        $user = new User($donnees);                  // le rôle reste CLIENT (valeur par défaut)
        $user->accepte_conditions_at = now();
        $user->save();

        return response()->json([
            'user'  => new UserResource($user),
            'token' => $user->createToken('auth')->plainTextToken,
        ], 201);
    }

    /** POST /api/connexion */
    public function connexion(ConnexionRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            // même message dans les deux cas, pour ne pas révéler si l'email existe
            throw ValidationException::withMessages([
                'email' => 'Email ou mot de passe incorrect.',
            ]);
        }

        return response()->json([
            'user'  => new UserResource($user),
            'token' => $user->createToken('auth')->plainTextToken,
        ]);
    }

    /** POST /api/deconnexion : supprime le token utilisé */
    public function deconnexion(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté.']);
    }

    /** GET /api/moi : utilisateur connecté */
    public function moi(Request $request): JsonResponse
    {
        return response()->json(['user' => new UserResource($request->user())]);
    }
}
