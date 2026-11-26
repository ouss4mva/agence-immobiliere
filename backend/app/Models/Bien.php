<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bien extends Model
{
    protected $table = 'bien';

    // type_operation et created_by sont volontairement absents : ils sont fixés par le code
    protected $fillable = [
        'titre', 'description', 'type_bien_id', 'ville_id', 'adresse',
        'surface_m2', 'nb_chambres', 'nb_salles_bain',
        'duree_location', 'prix', 'unite_prix', 'statut', 'est_vedette',
    ];

    protected function casts(): array
    {
        return ['est_vedette' => 'boolean'];
    }

    public function typeBien(): BelongsTo
    {
        return $this->belongsTo(TypeBien::class, 'type_bien_id');
    }

    public function ville(): BelongsTo
    {
        return $this->belongsTo(Ville::class, 'ville_id');
    }

    // Photo principale d'abord
    public function photos(): HasMany
    {
        return $this->hasMany(Photo::class, 'bien_id')
            ->orderByDesc('est_principale')->orderBy('ordre')->orderBy('id');
    }

    public function scopeLocation(Builder $q): Builder
    {
        return $q->where('type_operation', 'LOCATION');
    }

    public function scopeVente(Builder $q): Builder
    {
        return $q->where('type_operation', 'VENTE');
    }

    public function scopeDisponible(Builder $q): Builder
    {
        return $q->where('statut', 'DISPONIBLE');
    }
}
