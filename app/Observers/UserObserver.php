<?php

namespace App\Observers;


use App\Mail\WelcomeNewUser;
use App\Models\Address;
use App\Models\Order;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserHelpers;
use App\Notifications\OrderPaid;
use App\Services\Traits\NotificationHelper;
use Illuminate\Mail\Markdown;
use Illuminate\Support\Facades\Mail;


class UserObserver
{
    use NotificationHelper;
    /**
     * Handle the user "created" event.
     *
     * @param \App\User $element
     * @return void
     */
    public function created(User $element)
    {
        activity()
            ->performedOn($element)
            ->causedBy(auth()->user())
            ->log(strtoupper(class_basename($element)) . ' ' . __FUNCTION__);
        $element->addresses()->create([
            'name' => 'address_one',
            'content' => $element->address,
            'block' => $element->block,
            'street' => $element->street,
            'apartment' => $element->apartment,
            'floor' => $element->floor,
            'building' => $element->building,
            'country_name' => $element->country_name,
            'area' => $element->area,
            'area_id' => $element->area_id,
            'country_id' => $element->country_id,
        ]);
        if (env('MAIL_ENABLED')) {
            Mail::to($element->email)->send(new WelcomeNewUser($element));
        }
        if (env('SMS_ENABLED') && env('NEXMO_KEY') && $element->mobile) {
            $code = random_int(1111, 9999);
            $element->update(['mobile_code' => $code]);
            $this->sendVerificationCode($element->fullMobile, $code);
        }

    }

    /**
     * Handle the user "updated" event.
     *
     * @param \App\User $element
     * @return void
     */
    public function updated(User $element)
    {
        activity()->performedOn($element)
            ->causedBy(auth()->user())
            ->log(strtoupper(class_basename($element)) . ' ' . __FUNCTION__);
        $address = Address::where(['user_id' => $element->id, 'name' => 'address_one'])->first();
        if ($address) {
            $address->update([
                'name' => 'address_one',
                'content' => $element->address,
                'block' => $element->block,
                'street' => $element->street,
                'apartment' => $element->apartment,
                'floor' => $element->floor,
                'building' => $element->building,
                'country_name' => $element->country_name,
                'area' => $element->area,
                'country_id' => $element->country_id,
                'user_id' => $element->id,
            ]);
        } else {
            Address::create([
                'name' => 'address_one',
                'content' => $element->address,
                'block' => $element->block,
                'street' => $element->street,
                'apartment' => $element->apartment,
                'floor' => $element->floor,
                'building' => $element->building,
                'country_name' => $element->country_name,
                'area' => $element->area,
                'country_id' => $element->country_id,
                'user_id' => $element->id,
            ]);
        }
    }

    /**
     * Handle the user "deleted" event.
     *
     * @param \App\User $user
     * @return void
     */
    public function deleted(User $user)
    {
        activity()->performedOn($user)
            ->causedBy(auth()->user())
            ->log(class_basename($user) . ' ' . __FUNCTION__);
    }

    /**
     * Handle the user "restored" event.
     *
     * @param \App\User $user
     * @return void
     */
    public function restored(User $user)
    {
        //
    }

    /**
     * Handle the user "force deleted" event.
     *
     * @param \App\User $user
     * @return void
     */
    public function forceDeleted(User $user)
    {
        activity()->performedOn($user)
            ->causedBy(auth()->user())
            ->log(class_basename($user) . ' ' . __FUNCTION__);
    }
}
