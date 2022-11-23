<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Image;
use App\Services\Traits\ImageHelpers;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    use ImageHelpers;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\Response
     */
    public function show(Image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image)
    {
        return inertia('Backend/Image/ImageEdit', compact('image'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Image $image)
    {
        $request->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'caption_ar' => 'max:1000',
            'caption_en' => 'max:1000',
            'active' => 'required|boolean',
        ]);
        if ($image->update($request->except('image'))) {
            $request->hasFile('image') ? $this->saveMimes($image, $request, ['image'], ['1080', '1440'], true, true) : null;
            return redirect()->route('backend.' . $image->imagable->type . '.edit', $image->imagable_id)->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Image $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        $model = strtolower(class_basename($image->imagable_type));
        $id = $image->imagable_id;
        if ($image->delete()) {
            return redirect()->route('backend.' . $model . '.edit', $id)->with('success', trans('general.process_success'));
        }
        return redirect()->route('backend.' . $model . '.edit', $id)->with('error', trans('general.process_failure'));
    }
}
