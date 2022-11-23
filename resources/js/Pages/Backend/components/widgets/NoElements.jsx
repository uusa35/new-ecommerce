import {useContext, Fragment} from 'react';
import {AppContext} from '../../../context/AppContext';
import {FiSearch} from 'react-icons/fi';

const NoElements = ({display = false}) => {
    const {trans, mainColor, mainBgColor} = useContext(AppContext);
    return (
        <Fragment>
            {display && (
                <div
                    className={`flex flex-col justify-center items-center max-w-full h-60 border-2 border-gray-100 p-8 bg-${mainBgColor}-100 dark:bg-${mainBgColor}-100 rounded-md shadow-md`}
                >
                    <FiSearch
                        size={150}
                        className={`text-${mainColor}-200 dark:text-${mainColor}-800`}
                    />
                    <span
                        className={`text-${mainColor}-400 dark:text-${mainColor}-800`}
                    >
                        {trans('no_elements')}
                    </span>
                </div>
            )}
        </Fragment>
    );
};

export default NoElements;
