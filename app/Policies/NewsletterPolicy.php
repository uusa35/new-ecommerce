<?php

namespace App\Policies;

use App\Models\User;
use App\Newsletter;
use Illuminate\Auth\Access\HandlesAuthorization;

class NewsletterPolicy
{
    use HandlesAuthorization;
    const MODAL = 'newsletter';

    /**
     * Determine whether the user can view the newsletter.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Newsletter  $newsletter
     * @return mixed
     */
    public function view(User $user, Newsletter $newsletter)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create newsletters.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the newsletter.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Newsletter  $newsletter
     * @return mixed
     */
    public function update(User $user, Newsletter $newsletter)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the newsletter.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Newsletter  $newsletter
     * @return mixed
     */
    public function delete(User $user, Newsletter $newsletter)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the newsletter.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Newsletter  $newsletter
     * @return mixed
     */
    public function restore(User $user, Newsletter $newsletter)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the newsletter.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Newsletter  $newsletter
     * @return mixed
     */
    public function forceDelete(User $user, Newsletter $newsletter)
    {
        //
    }
}
