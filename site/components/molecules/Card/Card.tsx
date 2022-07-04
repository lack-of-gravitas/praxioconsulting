import React from 'react'
import Link from 'next/link'
import ReactPlayer from 'react-player'

export default function Card({
  permalink,
  image,
  name,
  description,
  price,
}: any) {
  return (
    <Link href="/product/[permalink]" as={`/product/${permalink}`}>
      <a className="mb-5 cursor-pointer d-block font-color-black">
        <div
          className="mb-3"
          style={{
            paddingBottom: '125%',
            background: `url("${image}") center center/cover`,
          }}
        ></div>
        <p className="mb-2 font-size-subheader font-weight-medium">{name}</p>
        <p className="mb-2 font-color-medium">{description}</p>
        <p className="pb-2 font-size-subheader font-weight-medium borderbottom border-color-black">
          {price}
        </p>
      </a>
    </Link>
  )
}

const VideoCard = ({ data }: any) => {
  let video = data
  // console.log("video -- ", video);

  return (
    <div className="max-w-2xl pb-16 mx-auto overflow-hidden bg-white rounded-xs shadow-xs dark:bg-gray-800">
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
  )
}
