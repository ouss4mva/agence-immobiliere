<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InscriptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $this->merge(['email' => strtolower(trim((string) $this->email))]);
    }

    public function rules(): array
    {
        return [
            'civilite'       => ['required', 'in:M,MME'],
            'nom'            => ['required', 'string', 'min:2', 'max:100'],
            'prenom'         => ['required', 'string', 'min:2', 'max:100'],
            // 18 ans minimum
            'date_naissance' => ['required', 'date', 'before_or_equal:' . now()->subYears(18)->toDateString()],
            'email'          => ['required', 'email', 'max:150', 'unique:users,email'],
            'telephone'      => ['required', 'regex:/^[0-9+\s().-]{8,20}$/'],
            'adresse'        => ['required', 'string', 'min:5', 'max:255'],
            'code_postal'    => ['nullable', 'string', 'max:10'],
            'ville'          => ['required', 'string', 'max:100'],
            'pays'           => ['required', 'string', 'max:100'],
            'password'       => ['required', 'string', 'min:8', 'confirmed'],
            'accepte_conditions' => ['accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'required'                       => 'Ce champ est obligatoire.',
            'civilite.in'                    => 'Choisissez une civilité.',
            'min'                            => 'Valeur trop courte.',
            'max'                            => 'Valeur trop longue.',
            'date_naissance.date'            => 'Date de naissance invalide.',
            'date_naissance.before_or_equal' => 'Vous devez avoir au moins 18 ans.',
            'email.email'                    => 'Entrez une adresse email valide.',
            'email.unique'                   => 'Un compte existe déjà avec cet email.',
            'telephone.regex'                => 'Entrez un numéro de téléphone valide.',
            'password.min'                   => 'Au moins 8 caractères.',
            'password.confirmed'             => 'Les mots de passe ne correspondent pas.',
            'accepte_conditions.accepted'    => 'Vous devez accepter pour créer un compte.',
        ];
    }
}
