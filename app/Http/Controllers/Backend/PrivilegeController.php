<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\PrivilegeCollection;
use App\Models\Privilege;
use Illuminate\Http\Request;

class PrivilegeController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Privilege::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new PrivilegeCollection(Privilege::orderBy('name_en','asc')->paginate(Self::TAKE_MID));
        return inertia('Backend/Privilege/PrivilegeIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Privilege/PrivilegeCreate');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Privilege  $privilege
     * @return \Illuminate\Http\Response
     */
    public function show(Privilege $privilege)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Privilege  $privilege
     * @return \Illuminate\Http\Response
     */
    public function edit(Privilege $privilege)
    {
        $privilege->load('roles');
        $pivotElements = $privilege->roles->pluck('pivot')->toArray();
        return inertia('Backend/Privilege/PrivilegeEdit', compact('privilege','pivotElements'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Privilege  $privilege
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Privilege $privilege)
    {
        request()->validate([
            'name' => 'required|string|max:100',
            'name_ar' => 'required',
            'name_en' => 'required',
            'description_ar' => 'required',
            'description_en' => 'required',
            'order' => 'integer',
            'attributes' => 'array',
            'main_menu' => 'boolean',
        ]);
        if ($privilege->update($request->except('image'))) {
            if($request->has('attributes'))
            foreach($request->get('attributes') as $k => $v) {
                $privilege->roles()->updateExistingPivot($v['role_id'], $v);
            }
            $request->hasFile('image') ? $this->saveMimes($privilege, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.privilege.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.progress_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Privilege  $privilege
     * @return \Illuminate\Http\Response
     */
    public function destroy(Privilege $privilege)
    {
        //
    }
}
