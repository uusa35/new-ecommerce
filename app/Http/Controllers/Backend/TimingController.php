<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Timing;
use Illuminate\Http\Request;

class TimingController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Timing::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        request()->validate(
            ['service_id' => 'required|integer|exists:services,id']);
        $elements = Timing::where(['service_id' => request()->service_id])
            ->whereHas('service', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with(['service' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc')
            ->paginate(Self::TAKE_LESS)
            ->withQueryString();
        return inertia('Backend/Timing/TimingIndex', compact('elements'));
    }

    public function search(ProductFilters $filters)
    {
        $this->authorize('search', 'service');
        $validator = validator(request()->all(), ['search' => 'nullable']);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $elements = Timing::filters($filters)
            ->whereHas('service', fn($q) => auth()->user()->isAdminOrAbove ? $q : $q->where('user_id', auth()->id()))
            ->with(['service' => fn($q) => $q->select('name_ar', 'name_en', 'id')])
            ->orderBy('id', 'desc')
            ->withQueryString()->through(fn($element) => [
                'id' => $element->id,
                'date' => $element->date,
                'start' => $element->start,
                'end' => $element->end,
                'allow_multi_select' => $element->allow_multi_select,
                'notes_ar' => $element->notes_ar,
                'notes_en' => $element->notes_en,
                'order' => $element->order,
                'service' => $element->service->only('id', 'name_ar', 'name_en'),
            ]);
        return inertia('Backend/Timing/TimingIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        request()->validate([
            'service_id' => "required|exists:services,id"
        ]);
        return inertia('Backend/Timing/TimingCreate');
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
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
            'limit' => 'required|integer|min:1|max:999',
            'notes_ar' => 'max:1000',
            'notes_en' => 'max:1000'
        ]);
        Timing::create($request->request->all());
        return redirect()->route('backend.timing.index', ['service_id' => $request->service_id])->with('success', trans('general.process_success'));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function show(Timing $timing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function edit(Timing $timing)
    {
        return inertia('Backend/Timing/TimingEdit', compact('timing'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Timing $timing)
    {
        $request->validate([
            'date' => 'required|date_format:Y-m-d',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
            'limit' => 'required|integer|min:1|max:999',
            'notes_ar' => 'max:1000',
            'notes_en' => 'max:1000'
        ]);
        if ($timing->update($request->all())) {
            return redirect()->route('backend.timing.index', ['service_id' => $timing->service_id])->with('success', trans('general.process_success'));
        }
        return redirect()->back()->withErrors(trans('general.progress_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Timing $timing
     * @return \Illuminate\Http\Response
     */
    public function destroy(Timing $timing)
    {
        $serviceId = $timing->service_id;
        if ($timing->delete()) {
            return redirect()->route('backend.timing.index', ['service_id' => $serviceId]);
        }
        return redirect()->back()->withErrors('process_failure');
    }
}
