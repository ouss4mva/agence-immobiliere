<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EstAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->estAdmin()) {
            return response()->json(['message' => "Accès réservé à l'agence."], 403);
        }

        return $next($request);
    }
}
