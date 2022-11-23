<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Privilege;
use Illuminate\Auth\Access\HandlesAuthorization;

class PrivilegePolicy
{
    use HandlesAuthorization;
    const MODAL = 'privilege';


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
     * Determine whether the user can view the privilege.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Privilege  $privilege
     * @return mixed
     */
    public function view(User $user, Privilege $privilege)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create privileges.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the privilege.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Privilege  $privilege
     * @return mixed
     */
    public function update(User $user, Privilege $privilege)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the privilege.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Privilege  $privilege
     * @return mixed
     */
    public function delete(User $user, Privilege $privilege)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the privilege.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Privilege  $privilege
     * @return mixed
     */
    public function restore(User $user, Privilege $privilege)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the privilege.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Privilege  $privilege
     * @return mixed
     */
    public function forceDelete(User $user, Privilege $privilege)
    {
        //
    }
}
