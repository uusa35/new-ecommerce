import {Fragment, useContext, useEffect, useMemo} from 'react';
import {AppContext} from '../../../context/AppContext';

const LoadingView = () => {
    const {toggleIsLoading, isLoading, mainBgColor} = useContext(AppContext);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => toggleIsLoading(false));
        }
    }, [isLoading]);

    return (
        <div className="absolute top-0 left-0 z-40 flex flex-grow items-end justify-center h-full overflow-y-scroll pt-4 px-4 pb-20 text-center sm:block sm:p-0  opacity-100 w-full">
            <div className="flex h-full min-w-full flex-1 justify-center items-center">
                <div className="w-20 h-20 border-t-2 border-b-2 border-gray-400 rounded-full animate-spin"></div>
            </div>
        </div>
    );
};

export default LoadingView;
