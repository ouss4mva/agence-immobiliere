<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Region extends Model
{
    protected $table = 'region';
    public $timestamps = false;
    protected $fillable = ['nom'];

    public function villes(): HasMany
    {
        return $this->hasMany(Ville::class, 'region_id');
    }
}
