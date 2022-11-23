<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\CountryCollection;
use App\Mail\ContactusForm;
use App\Mail\Joinus;
use App\Models\Country;
use App\Models\Faq;
use App\Models\Setting;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class FrontendPageController extends Controller
{
    public function getContactus()
    {
        return inertia('Frontend/Pages/ContactusPage');
    }

    public function postContactus(Request $request)
    {
        $request->validate([
            'first_name' => 'required|min:3|max:200',
            'last_name' => 'required|min:3|max:200',
            'mobile' => 'min:5|max:15',
            'subject' => 'required',
            'content' => 'required',
            'code' => 'required|confirmed'
        ]);
        $settings = Setting::first();
        Mail::to($settings->email)->cc($request->email)->send(new ContactusForm());
        return redirect()->route('frontend.home')->with('success', trans('general.process_success'));
    }

    public function getJoinus()
    {
        $countries = new CountryCollection(Country::active()->get());
        return inertia('Frontend/Pages/JoinusPage', compact('countries'));
    }

    public function postJoinus(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:200',
            'address' => 'min:3|max:250',
            'exported_before' => 'required|boolean',
            'mobile' => 'min:5|max:15',
            'notes' => 'min:3|max:1000',
            'country_name' => 'nullable|alpha',
            'content' => 'required|max:2000',
            'code' => 'required|confirmed'
        ]);
        $settings = Setting::first();
        Mail::to($settings->email)->cc($request->email)->send(new Joinus());
        return redirect()->route('frontend.home')->with('success', trans('general.process_success'));
    }

    public function getAboutus()
    {
        return inertia('Frontend/Pages/AboutusPage');
    }

    public function getPolicies()
    {
        return inertia('Frontend/Pages/PolicesPage');
    }

    public function getTerms()
    {
        return inertia('Frontend/Pages/TermsPage');
    }

    public function getServices()
    {
        return inertia('Frontend/Pages/ServicesPage');
    }

    public function getWhous()
    {
        return inertia('Frontend/Pages/WhousPage');
    }

    public function getImportFromEgypt()
    {
        return inertia('Frontend/Pages/ImportFromEgyptPage');
    }

    public function getDistributionServicePage()
    {
        return inertia('Frontend/Pages/DistributionServicePage');
    }

    public function getVacancies()
    {
        return inertia('Frontend/Pages/VacanciesPage');
    }

    public function getProductImages()
    {
        return inertia('Frontend/Pages/MgtProductImagesPage');
    }

    public function getFaqs()
    {
        $elements = Faq::active()->get();
        return inertia('Frontend/Pages/FaqsPage', compact('elements'));
    }

    public function getSubscriptions()
    {
        $elements = Subscription::active()->get();
        return inertia('Frontend/Pages/SubscriptionsPage', compact('elements'));
    }
}
