<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Setting::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $setting = Setting::with('images')->first();
        return inertia('Backend/Setting/SettingIndex', compact('setting'));
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
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        $setting = Setting::with('images')->first();
        $themes = explode(",", env('THEMES'));
        $paymentMethods = explode(",", env('PAYMENT_METHODS'));
        $fonts  = ['font-tajwal-medium', 'font-bein', 'font-bein-bold', 'font-bbc','font-gesst','font-gesst-medium','font-helve-one', 'font-kufi', 'font-noto','font-fredoka', 'font-uthman', 'font-sansarab','font-droid','font-cocon','font-goz', 'font-sakr-bold'];
        return inertia('Backend/Setting/SettingEdit', compact('setting', 'themes', 'paymentMethods', 'fonts'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        $request->validate([
            'name_ar' => 'string',
            'name_en' => 'string',
        ]);
        $element = $setting->update($request->except('image', 'images', 'qr', 'app_log', 'shipment_prices'));
        if ($element) {
            $request->hasFile('image') ? $this->saveMimes($setting, $request, ['image'], ['1000', '1000'], false) : null;
            $request->hasFile('qr') ? $this->saveMimes($setting, $request, ['qr'], ['300', '300'], false) : null;
            $request->has('images') ? $this->saveGallery($setting, $request, 'images', ['1080', '1440'], false) : null;
            $request->hasFile('size_chart_image') ? $this->saveMimes($setting, $request, ['size_chart_image'], ['1080', '1440'], true) : null;
            $request->hasFile('shipment_prices') ? $this->saveMimes($setting, $request, ['shipment_prices'], ['1080', '1440'], true) : null;
            $request->hasFile('app_logo') ? $this->saveMimes($setting, $request, ['app_logo'], ['1000', '1000'], false) : null;
            $request->hasFile('main_bg') ? $this->saveMimes($setting, $request, ['main_bg'], ['1000', '1000'], false) : null;
            $request->hasFile('menu_bg') ? $this->saveMimes($setting, $request, ['menu_bg'], ['1900', '255'], false) : null;
            return redirect()->route('backend.setting.edit', $setting->id)->with('success', trans('general.process_success'));
        }
        return redirect()->back()->withErrors(trans('general.process_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        //
    }
}
