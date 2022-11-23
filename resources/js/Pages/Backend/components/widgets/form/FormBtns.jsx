import {useContext} from 'react';
import {AppContext} from '../../../../context/AppContext';
import {Link} from '@inertiajs/inertia-react';
import route from 'ziggy-js';

const FormBtns = ({type}) => {
    const {trans} = useContext(AppContext);
    return (
        <div className="py-3">
            <div className="flex justify-end">
                <button
                    type="submit"
                    className={`ml-3 inline-flex justify-center py-2 px-10 mx-4 shadow-lg font-medium rounded-md text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 capitalize`}
                >
                    {trans('save')}
                </button>
                <Link
                    href={route(`backend.${type}.index`)}
                    className={`bg-red-900 py-2 px-10 border border-red-300 rounded-md shadow-lg font-medium text-gray-50 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 capitalize`}
                >
                    {trans('cancel')}
                </Link>
            </div>
        </div>
    );
};

export default FormBtns;
