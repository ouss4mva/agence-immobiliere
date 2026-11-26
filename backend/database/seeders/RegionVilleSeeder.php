<?php

namespace Database\Seeders;

use App\Models\Region;
use App\Models\Ville;
use Illuminate\Database\Seeder;

class RegionVilleSeeder extends Seeder
{
    public function run(): void
    {
        $donnees = [
            'Tanger-Tétouan-Al Hoceïma'   => ['Tanger', 'Tétouan', 'Al Hoceïma'],
            "L'Oriental"                  => ['Oujda', 'Nador'],
            'Fès-Meknès'                  => ['Fès', 'Meknès'],
            'Rabat-Salé-Kénitra'          => ['Rabat', 'Salé', 'Kénitra', 'Témara'],
            'Béni Mellal-Khénifra'        => ['Béni Mellal'],
            'Casablanca-Settat'           => ['Casablanca', 'Mohammedia', 'El Jadida', 'Settat'],
            'Marrakech-Safi'              => ['Marrakech', 'Safi', 'Essaouira'],
            'Drâa-Tafilalet'              => ['Errachidia', 'Ouarzazate'],
            'Souss-Massa'                 => ['Agadir', 'Tiznit'],
            'Guelmim-Oued Noun'           => ['Guelmim'],
            'Laâyoune-Sakia El Hamra'     => ['Laâyoune'],
            'Dakhla-Oued Ed-Dahab'        => ['Dakhla'],
        ];

        foreach ($donnees as $nomRegion => $villes) {
            $region = Region::firstOrCreate(['nom' => $nomRegion]);

            foreach ($villes as $nom) {
                Ville::firstOrCreate(['region_id' => $region->id, 'nom' => $nom]);
            }
        }
    }
}
