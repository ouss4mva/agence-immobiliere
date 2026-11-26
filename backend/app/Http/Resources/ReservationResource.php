<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'           => $this->id,
            'date_debut'   => $this->date_debut->toDateString(),
            'date_fin'     => $this->date_fin->toDateString(),
            'nb_personnes' => $this->nb_personnes,
            'prix_total'   => $this->prix_total,
            'statut'       => $this->statut, // CONFIRMEE | ANNULEE | TERMINEE
            'bien'         => new BienResource($this->whenLoaded('bien')),
            'user'         => new UserResource($this->whenLoaded('user')),
        ];
    }
}