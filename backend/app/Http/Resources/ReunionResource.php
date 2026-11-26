<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReunionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'date_heure' => $this->date_heure->toIso8601String(),
            'message'    => $this->message,
            'statut'     => $this->statut, // CONFIRMEE | ANNULEE | EFFECTUEE
            'bien'       => new BienResource($this->whenLoaded('bien')),
            'user'       => new UserResource($this->whenLoaded('user')),
        ];
    }
}
