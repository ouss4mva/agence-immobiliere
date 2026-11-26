<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Photo extends Model
{
    protected $table = 'photo';
    public $timestamps = false;
    protected $fillable = ['bien_id', 'url', 'est_principale', 'ordre'];

    protected function casts(): array
    {
        return ['est_principale' => 'boolean'];
    }

    // Supprime le fichier du disque (sauf si c'est une URL externe)
    public function supprimerFichier(): void
    {
        if (! Str::startsWith($this->url, 'http')) {
            Storage::disk('public')->delete($this->url);
        }
    }
}
