import React, {Fragment, useEffect} from 'react';
import {isEmpty, map, first, isNull} from 'lodash';
import {usePage} from '@inertiajs/inertia-react';
import {hideToastMessage, showToastMessage} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

const SystemMessage = () => {
    const dispatch = useDispatch();
    const {errors, error, success} = usePage().props;

    useEffect(() => {
        !isNull(success) && !isEmpty(success)
            ? dispatch(showToastMessage({message: success, type: 'success'}))
            : null;
        errors && !isEmpty(errors)
            ? dispatch(
                  showToastMessage({
                      message: first(map(errors, (e) => e)),
                      type: 'error',
                  })
              )
            : null;
        !isNull(error) && !isEmpty(error)
            ? dispatch(showToastMessage({message: error, type: 'error'}))
            : null;
        const messageTime = setTimeout(() => dispatch(hideToastMessage()), 3000);
        return () => clearInterval(messageTime)
    }, [success, errors, error]);

    return <Fragment></Fragment>;
};
export default SystemMessage;
