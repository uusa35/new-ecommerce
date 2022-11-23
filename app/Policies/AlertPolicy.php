<?php

namespace App\Policies;

use App\Models\User;
use App\Alert;
use Illuminate\Auth\Access\HandlesAuthorization;

class AlertPolicy
{
    use HandlesAuthorization;
    const MODAL = 'alert';

    /**
     * Determine whether the user can view the alert.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Alert  $alert
     * @return mixed
     */
    public function view(User $user, Alert $alert)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create alerts.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the alert.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Alert  $alert
     * @return mixed
     */
    public function update(User $user, Alert $alert)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the alert.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Alert  $alert
     * @return mixed
     */
    public function delete(User $user, Alert $alert)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the alert.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Alert  $alert
     * @return mixed
     */
    public function restore(User $user, Alert $alert)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the alert.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Alert  $alert
     * @return mixed
     */
    public function forceDelete(User $user, Alert $alert)
    {
        //
    }
}
