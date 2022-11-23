<?php

namespace App\Policies;

use App\Models\Nationalevent;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class NationalEventPolicy
{
    use HandlesAuthorization;
    const MODAL = 'nationalevent';

    /**
     * Determine whether the user can view any models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->isAdminOrAbove || $user->role->privileges->where('name', self::MODAL)->first()->pivot->index;
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Nationalevent  $nationalevent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Nationalevent $nationalevent)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $nationalevent->user_id;
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function create(User $user)
    {
        return $user->isAdminOrAbove || $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__};
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Nationalevent  $nationalevent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Nationalevent $nationalevent)
    {
        return $user->isAdminOrAbove ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : $user->id === $nationalevent->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Nationalevent  $nationalevent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Nationalevent $nationalevent)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Nationalevent  $nationalevent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function restore(User $user, Nationalevent $nationalevent)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Nationalevent  $nationalevent
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function forceDelete(User $user, Nationalevent $nationalevent)
    {
        //
    }
}
