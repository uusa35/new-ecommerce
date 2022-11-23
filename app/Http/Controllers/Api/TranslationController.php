<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TranslationResource;
use App\Models\Translation;
use Illuminate\Http\Request;
use function MongoDB\BSON\toJSON;

class TranslationController extends Controller
{
    public function getTranslations()
    {
        $elements = json_decode(TranslationResource::collection(Translation::all())->toJson(), true);
        $data = array_merge(...$elements); // merge;
        return response()->json($data, 200);
        return response()->json(json_encode(['ar' => $data], JSON_PRETTY_PRINT), 200);
    }
}
