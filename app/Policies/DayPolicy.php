<?php

namespace App\Policies;

use App\Models\User;
use App\Day;
use Illuminate\Auth\Access\HandlesAuthorization;

class DayPolicy
{
    use HandlesAuthorization;
    const MODAL = 'day';

    /**
     * Determine whether the user can view the day.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Day  $day
     * @return mixed
     */
    public function view(User $user, Day $day)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create days.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the day.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Day  $day
     * @return mixed
     */
    public function update(User $user, Day $day)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the day.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Day  $day
     * @return mixed
     */
    public function delete(User $user, Day $day)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the day.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Day  $day
     * @return mixed
     */
    public function restore(User $user, Day $day)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the day.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Day  $day
     * @return mixed
     */
    public function forceDelete(User $user, Day $day)
    {
        //
    }
}
