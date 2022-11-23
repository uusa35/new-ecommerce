<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqCollection;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Faq::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new FaqCollection(Faq::orderBy('id', 'desc')->paginate(Self::TAKE_LESS));
        return inertia('Backend/Faq/FaqIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Faq/FaqCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name_ar' => 'required|max:200',
            'name_en' => 'required|max:200',
            'description_ar' => 'required|max:9999',
            'description_en' => 'required|max:9999',
            'order' => 'numeric|max:99'
        ]);
        if (Faq::create($request->all())) {
            return redirect()->route('backend.faq.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\faq $faq
     * @return \Illuminate\Http\Response
     */
    public function show(faq $faq)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\faq $faq
     * @return \Illuminate\Http\Response
     */
    public function edit(faq $faq)
    {
        return inertia('Backend/Faq/FaqEdit', compact('faq'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\faq $faq
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, faq $faq)
    {
        $request->validate([
            'name_ar' => 'required|max:200',
            'name_en' => 'required|max:200',
            'description_ar' => 'required|max:9999',
            'description_en' => 'required|max:9999',
            'order' => 'numeric|max:99'
        ]);
        if ($faq->update($request->all())) {
            return redirect()->route('backend.faq.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\faq $faq
     * @return \Illuminate\Http\Response
     */
    public function destroy(faq $faq)
    {
        if ($faq->delete()) {
            return redirect()->back()->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.process_failure'));
    }
}
