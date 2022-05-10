import Link from "next/link";
import Image from "next/image";
import ReactPlayer from "react-player";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SneakPeek = ({ data }) => {
  let { header, contents } = data;
  // console.log("SneakPeek data -- ", data);

  const VideoCard = (content) => {
    let video = content.content;
    // console.log("video -- ", video);

    return (
      <div className="max-w-2xl pb-16 mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="object-cover w-full player-wrapper aspect-video h-4/5">
          <ReactPlayer
            controls={true}
            className="react-player "
            url={JSON.parse(video.video).url}
            width="100%"
            height="100%"
          />
        </div>

        <div className="px-6">
          <div>
            <span className="block mt-2 text-2xl font-semibold text-gray-800 dark:text-white hover:text-gray-600 hover:underline">
              {video.title}
            </span>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {video.description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {contents && (
        <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {header.title}
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                {header.text}
              </p>
            </div>

            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              {contents.map((content, index) => (
                <VideoCard key={index} content={content} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SneakPeek;
