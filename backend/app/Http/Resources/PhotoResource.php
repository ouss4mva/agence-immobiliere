<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class PhotoResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'url'            => Str::startsWith($this->url, 'http') ? $this->url : asset('storage/' . $this->url),
            'est_principale' => (bool) $this->est_principale,
            'ordre'          => $this->ordre,
        ];
    }
}
