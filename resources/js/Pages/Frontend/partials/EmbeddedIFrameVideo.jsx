export default function ({videoUrl}) {
    return (
        // <video width="100%" controls>
        //     <source src={videoUrl} type="video/mp4"/>
        // </video>
        <iframe
            width="100%"
            height="500"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            className="overflow-hidden aspect-h-1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
    );
}
