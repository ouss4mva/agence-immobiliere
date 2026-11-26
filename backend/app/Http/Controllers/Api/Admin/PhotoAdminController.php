<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PhotoResource;
use App\Models\Bien;
use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoAdminController extends Controller
{
    private function liste(int $bienId)
    {
        return PhotoResource::collection(
            Photo::where('bien_id', $bienId)
                ->orderByDesc('est_principale')->orderBy('ordre')->orderBy('id')->get()
        );
    }

    // Si aucune photo n'est principale, la première le devient
    private function assurerPrincipale(int $bienId): void
    {
        $photos = Photo::where('bien_id', $bienId);

        if (! (clone $photos)->where('est_principale', true)->exists()) {
            (clone $photos)->orderBy('ordre')->orderBy('id')->first()?->update(['est_principale' => true]);
        }
    }

    /** POST /api/admin/biens/{id}/photos */
    public function store(Request $request, int $id)
    {
        $bien = Bien::findOrFail($id);

        $request->validate([
            'photos'   => ['required', 'array', 'min:1', 'max:10'],
            'photos.*' => ['image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ], [
            'photos.required' => 'Choisissez au moins une photo.',
            'photos.max'      => '10 photos maximum à la fois.',
            'photos.*.image'  => 'Le fichier doit être une image.',
            'photos.*.mimes'  => 'Formats acceptés : JPG, PNG, WEBP.',
            'photos.*.max'    => 'Chaque photo doit faire 4 Mo maximum.',
        ]);

        $fichiers = $request->file('photos');

        if (Photo::where('bien_id', $bien->id)->count() + count($fichiers) > 10) {
            return response()->json(['message' => '10 photos maximum par bien.'], 422);
        }

        $ordre = (int) Photo::where('bien_id', $bien->id)->max('ordre');

        foreach ($fichiers as $fichier) {
            Photo::create([
                'bien_id'        => $bien->id,
                'url'            => $fichier->store('biens', 'public'),
                'est_principale' => false,
                'ordre'          => ++$ordre,
            ]);
        }

        $this->assurerPrincipale($bien->id);

        return $this->liste($bien->id);
    }

    /** PATCH /api/admin/photos/{id}/principale */
    public function principale(int $id)
    {
        $photo = Photo::findOrFail($id);

        Photo::where('bien_id', $photo->bien_id)->update(['est_principale' => false]);
        $photo->update(['est_principale' => true]);

        return $this->liste($photo->bien_id);
    }

    /** DELETE /api/admin/photos/{id} */
    public function destroy(int $id)
    {
        $photo = Photo::findOrFail($id);
        $bienId = $photo->bien_id;

        $photo->supprimerFichier();
        $photo->delete();
        $this->assurerPrincipale($bienId);

        return $this->liste($bienId);
    }
}
