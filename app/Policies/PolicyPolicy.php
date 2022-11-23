<?php

namespace App\Policies;

use App\Models\User;
use App\Policy;
use Illuminate\Auth\Access\HandlesAuthorization;

class PolicyPolicy
{
    use HandlesAuthorization;
    const MODAL = 'policy';

    /**
     * Determine whether the user can view the policy.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Policy  $policy
     * @return mixed
     */
    public function view(User $user, Policy $policy)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can create policies.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can update the policy.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Policy  $policy
     * @return mixed
     */
    public function update(User $user, Policy $policy)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can delete the policy.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Policy  $policy
     * @return mixed
     */
    public function delete(User $user, Policy $policy)
    {
        return $user->role->privileges->where('name', self::MODAL)->first() ? $user->role->privileges->where('name', self::MODAL)->first()->pivot->{__FUNCTION__} : false;
    }

    /**
     * Determine whether the user can restore the policy.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Policy  $policy
     * @return mixed
     */
    public function restore(User $user, Policy $policy)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the policy.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Policy  $policy
     * @return mixed
     */
    public function forceDelete(User $user, Policy $policy)
    {
        //
    }
}
