import {useContext} from 'react';
import {AppContext} from '../../../context/AppContext';

export default function ActiveDot({active = false}) {
    const {classNames} = useContext(AppContext);
    return (
        <div
            className={classNames(
                active ? 'bg-green-900' : 'bg-gray-600',
                'flex-shrink-0 w-2.5 h-2.5 mx-6 border-2 rounded-full'
            )}
            aria-hidden="true"
        ></div>
    );
}
