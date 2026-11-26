<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

class BienLocationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // l'accès est déjà limité par le middleware admin
    }

    public function rules(): array
    {
        return [
            'titre'          => ['required', 'string', 'max:200'],
            'description'    => ['nullable', 'string', 'max:5000'],
            'type_bien_id'   => ['required', 'exists:type_bien,id'],
            'ville_id'       => ['required', 'exists:ville,id'],
            'adresse'        => ['nullable', 'string', 'max:255'],
            'surface_m2'     => ['nullable', 'numeric', 'min:1', 'max:100000'],
            'nb_chambres'    => ['nullable', 'integer', 'min:0', 'max:50'],
            'nb_salles_bain' => ['nullable', 'integer', 'min:0', 'max:50'],
            'duree_location' => ['required', 'in:LONG_TERME,COURT_TERME'],
            'prix'           => ['required', 'numeric', 'min:1', 'max:99999999'],
            'unite_prix'     => ['required', 'in:NUIT,SEMAINE,MOIS'],
            'statut'         => ['sometimes', 'in:DISPONIBLE,RESERVE,LOUE'],
            'est_vedette'    => ['boolean'],
        ];
    }

    // Courte durée : nuit ou semaine / Longue durée : mois
    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $v) {
            $autorisees = ['COURT_TERME' => ['NUIT', 'SEMAINE'], 'LONG_TERME' => ['MOIS']];
            $duree = $this->input('duree_location');
            $unite = $this->input('unite_prix');

            if (isset($autorisees[$duree]) && $unite && ! in_array($unite, $autorisees[$duree], true)) {
                $v->errors()->add('unite_prix', $duree === 'COURT_TERME'
                    ? 'Courte durée : prix par nuit ou par semaine.'
                    : 'Longue durée : prix par mois.');
            }
        });
    }

    public function messages(): array
    {
        return [
            'required'            => 'Ce champ est obligatoire.',
            'exists'              => 'Valeur invalide.',
            'numeric'             => 'Entrez un nombre.',
            'integer'             => 'Entrez un nombre entier.',
            'min'                 => 'Valeur trop petite.',
            'max'                 => 'Valeur trop grande.',
            'duree_location.in'   => 'Durée invalide.',
            'unite_prix.in'       => 'Unité de prix invalide.',
            'statut.in'           => 'État invalide.',
        ];
    }
}
