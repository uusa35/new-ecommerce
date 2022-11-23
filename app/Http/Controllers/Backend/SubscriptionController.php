<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubscriptionCollection;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{

    /**
     * Create the controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->authorizeResource(Subscription::class);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $elements = new SubscriptionCollection(Subscription::paginate(Self::TAKE_LESS));
        return inertia('Backend/Subscription/SubscriptionIndex', compact('elements'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Backend/Subscription/SubscriptionCreate');
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
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function show(Subscription $subscription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function edit(Subscription $subscription)
    {
        return inertia('Backend/Subscription/SubscriptionEdit', compact('subscription'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subscription $subscription)
    {
        request()->validate([
            'name_ar' => 'max:200',
            'name_en' => 'max:200',
            'caption_ar' => 'max:300',
            'caption_en' => 'max:300',
            'description_ar' => 'max:1000',
            'description_en' => 'max:1000',
            'notes_ar' => 'max:1000',
            'notes_en' => 'max:1000',
            'order' => 'integer',
            'months' => 'integer|max:24|min:1',
            'free' => 'boolean',
            'on_sale' => 'boolean',
            'active' => 'boolean',
        ]);
        if ($subscription->update($request->except('image','privileges'))) {
            $request->hasFile('image') ? $this->saveMimes($subscription, $request, ['image'], ['300', '300'], false) : null;
            return redirect()->route('backend.subscription.index')->with('success', trans('general.process_success'));
        }
        return redirect()->back()->with('error', trans('general.progress_failure'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscription $subscription)
    {
        //
    }
}
