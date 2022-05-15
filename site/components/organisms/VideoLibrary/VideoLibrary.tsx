import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const VideoLibrary = ({data}) => {
  console.log("SneakPeek data -- ", data);

  const VideoCard = (video) => {
    return (
      <div className="max-w-2xl pb-16 mx-auto overflow-hidden bg-white rounded-md shadow-lg dark:bg-gray-800">
        <div className="object-cover w-full player-wrapper aspect-video h-4/5">
          <ReactPlayer
            controls={true}
            className="react-player "
            url={video.link}
            width="100%"
            height="100%"
          />
        </div>

        <div className="px-6">
          <div>
            <span className="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 hover:underline">
              {video.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {data.map((video) => (
                <li key={video.uri}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <img
                        className="object-cover shadow-lg rounded-md"
                        src={video.link}
                        alt=""
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-1">
                        <h3>{video.name}</h3>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoLibrary;
