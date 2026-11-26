<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'civilite'       => $this->civilite,
            'nom'            => $this->nom,
            'prenom'         => $this->prenom,
            'date_naissance' => $this->date_naissance->toDateString(),
            'email'          => $this->email,
            'telephone'      => $this->telephone,
            'adresse'        => $this->adresse,
            'code_postal'    => $this->code_postal,
            'ville'          => $this->ville,
            'pays'           => $this->pays,
            'role'           => $this->role,
        ];
    }
}
