<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'civilite', 'nom', 'prenom', 'date_naissance', 'email', 'telephone',
        'adresse', 'code_postal', 'ville', 'pays', 'password',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected function casts(): array
    {
        return [
            'date_naissance'        => 'date',
            'accepte_conditions_at' => 'datetime',
            'password'              => 'hashed', // chiffré automatiquement
        ];
    }

    public function estAdmin(): bool
    {
        return $this->role === 'ADMIN';
    }
}
