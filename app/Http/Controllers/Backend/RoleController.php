<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleCollection;
use App\Models\Privilege;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Role::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new RoleCollection(Role::paginate(Self::TAKE_LESS));
        return inertia('Backend/Role/RoleIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Role/RoleCreate');
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
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function edit(Role $role)
    {
        $role->load('privileges');
        $privileges = Privilege::all();
        return inertia('Backend/Role/RoleEdit', compact('role', 'privileges'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        request()->validate([
            'name' => 'required|string|max:100',
            'name_ar' => 'required',
            'name_en' => 'required',
            'caption_ar' => 'required',
            'caption_en' => 'required',
            'order' => 'integer',
            'is_admin' => 'boolean',
            'is_super' => 'boolean',
            'is_client' => 'boolean',
            'is_company' => 'boolean',
            'is_designer' => 'boolean',
            'is_celebrity' => 'boolean',
            'is_author' => 'boolean',
            'is_visible' => 'boolean',
            'is_driver' => 'boolean',
            'active' => 'boolean',
            'privileges' => 'array',
//            'color' => 'color'
        ]);
        if ($role->update($request->except('image','privileges'))) {
            $request->has('privileges') ? $role->privileges()->sync($request->privileges) : null;
            $request->hasFile('image') ? $this->saveMimes($role, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.role.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.progress_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        //
    }
}
