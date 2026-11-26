<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BienResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'titre'          => $this->titre,
            'description'    => $this->description,
            'adresse'        => $this->adresse,
            'surface_m2'     => $this->surface_m2,
            'nb_chambres'    => $this->nb_chambres,
            'nb_salles_bain' => $this->nb_salles_bain,

            // VENTE | LOCATION
            'type_operation' => $this->type_operation,
            // LONG_TERME | COURT_TERME | null (vente)
            'duree_location' => $this->duree_location,
            'prix'           => $this->prix,
            // NUIT | SEMAINE | MOIS | null (vente)
            'unite_prix'     => $this->unite_prix,

            // DISPONIBLE | RESERVE | VENDU | LOUE
            'statut'         => $this->statut,
            'est_vedette'    => (bool) $this->est_vedette,

            'type_bien_id'   => $this->type_bien_id,
            'ville_id'       => $this->ville_id,
            'type_bien'      => new TypeBienResource($this->whenLoaded('typeBien')),
            'ville'          => new VilleResource($this->whenLoaded('ville')),
            'photos'         => PhotoResource::collection($this->whenLoaded('photos')),
        ];
    }
}
