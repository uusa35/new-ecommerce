<?php

namespace App\Policies;

use App\Models\Timing;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TimingPolicy
{
    use HandlesAuthorization;
    const MODAL = 'timing';

    /**
     * Determine whether the user can view the category.
     *
     * @param \App\Models\User $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->index : false;
    }

    /**
     * Determine whether the user can view the timing.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\Timing $timing
     * @return mixed
     */
    public function view(User $user, Timing $timing)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $timing->user_id;
    }


    /**
     * Determine whether the user can create timings.
     *
     * @param  \App\Models\User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the timing.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\Timing $timing
     * @return mixed
     */
    public function update(User $user, Timing $timing)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $timing->user_id;
    }

    /**
     * Determine whether the user can delete the timing.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\Timing $timing
     * @return mixed
     */
    public function delete(User $user, Timing $timing)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $timing->user_id;
    }

    /**
     * Determine whether the user can restore the timing.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\Timing $timing
     * @return mixed
     */
    public function restore(User $user, Timing $timing)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the timing.
     *
     * @param  \App\Models\User $user
     * @param  \App\Models\Timing $timing
     * @return mixed
     */
    public function forceDelete(User $user, Timing $timing)
    {
        //
    }
}
