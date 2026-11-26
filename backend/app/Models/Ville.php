<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Ville extends Model
{
    protected $table = 'ville';
    public $timestamps = false;
    protected $fillable = ['region_id', 'nom'];

    public function region(): BelongsTo
    {
        return $this->belongsTo(Region::class, 'region_id');
    }
}
