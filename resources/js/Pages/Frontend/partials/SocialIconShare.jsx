import {
    TwitterIcon,
    TwitterShareButton,
    FacebookShareButton,
    FacebookIcon,
    LinkedinIcon,
    LinkedinShareButton,
} from 'react-share';
import {useContext} from 'react';
import {AppContext} from '../../context/AppContext';

export default function ({
    url = '',
    facebook = '',
    twitter = '',
    youtube = '',
    instagram = '',
}) {
    const {trans} = useContext(AppContext);
    return (
        <div className="flex flex-1 w-full justify-end items-center gap-x-6 p-5 mt-10">
            <div className="mb-3">
                <h1>{trans('share')}</h1>
            </div>
            <div>
                <FacebookShareButton
                    url={window.location.href}
                    // quote={"CampersTribe - World is yours to explore"}
                    // hashtag="#camperstribe"
                    className={'shadow-sm rounded-full '}
                >
                    <FacebookIcon round={true} size={30} />
                </FacebookShareButton>
            </div>
            <div>
                <TwitterShareButton
                    url={window.location.href}
                    // quote={"CampersTribe - World is yours to explore"}
                    // hashtag="#camperstribe"
                    className={'shadow-sm rounded-full '}
                >
                    <TwitterIcon round={true} size={30} />
                </TwitterShareButton>
            </div>
            <div>
                <LinkedinShareButton
                    url={window.location.href}
                    // quote={"CampersTribe - World is yours to explore"}
                    // hashtag="#camperstribe"
                    className={'shadow-sm rounded-full '}
                >
                    <LinkedinIcon round={true} size={30} />
                </LinkedinShareButton>
            </div>
        </div>
    );
}
