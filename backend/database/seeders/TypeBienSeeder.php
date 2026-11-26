<?php

namespace Database\Seeders;

use App\Models\TypeBien;
use Illuminate\Database\Seeder;

class TypeBienSeeder extends Seeder
{
    public function run(): void
    {
        foreach (['Appartement', 'Villa', 'Maison', 'Studio', 'Riad', 'Terrain', 'Local commercial', 'Bureau'] as $libelle) {
            TypeBien::firstOrCreate(['libelle' => $libelle]);
        }
    }
}
