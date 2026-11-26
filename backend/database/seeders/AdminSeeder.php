<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrNew(['email' => 'admin@agence.ma']);

        // forceFill : le rôle n'est pas modifiable par le formulaire public
        $admin->forceFill([
            'civilite'              => 'M',
            'nom'                   => 'Agence',
            'prenom'                => 'Admin',
            'date_naissance'        => '1990-01-01',
            'telephone'             => '+212 6 00 00 00 00',
            'adresse'               => 'Adresse de l\'agence',
            'ville'                 => 'Rabat',
            'pays'                  => 'Maroc',
            'password'              => 'Admin12345!', // à changer avant la mise en ligne
            'role'                  => 'ADMIN',
            'accepte_conditions_at' => now(),
        ])->save();
    }
}

