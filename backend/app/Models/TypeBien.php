<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeBien extends Model
{
    protected $table = 'type_bien';
    public $timestamps = false;
    protected $fillable = ['libelle'];
}
