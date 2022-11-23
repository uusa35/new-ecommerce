import {useState, useCallback, Fragment, useRef, useContext} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {AppContext} from '../../context/AppContext';
import {useSelector} from 'react-redux';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

export default function ImageUploadModal({image, setData}) {
    const {classNames, trans, getThumb, getLocalized} = useContext(AppContext);
    const {locale} = useSelector((state) => state);
    const [crop, setCrop] = useState({aspect: 16 / 9});

    // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    //     console.log(croppedArea, croppedAreaPixels)
    // }, [])

    return (
        <div className="flex flex-1 border-2 border-black w-full h-full">
            {/* cropper  here */}
            <ReactCrop
                src={window.URL.createObjectURL(image)}
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
            />
            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                    type="button"
                    className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:col-start-1 sm:text-sm`}
                >
                    {trans('cancel')}
                </button>
                <button type="button">{trans('confirm')}</button>
            </div>
        </div>
    );
}
