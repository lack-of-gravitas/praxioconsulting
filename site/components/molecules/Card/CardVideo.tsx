import dynamic from 'next/dynamic'
import ReactPlayer from 'react-player'
// import s from './CardVideo.module.css'

const ProseGeneral = dynamic(
  () => import('@components/molecules/Prose/ProseGeneral')
)
export default function CardVideo({ data, colors }: any) {
  // console.log('videocard :', data)

  return (
    <>
      {data && (
        <>
          <article className="max-w-sm mx-auto cursor-pointer">
            <div className="overflow-hidden max-h-150">
              <ReactPlayer
                controls={true}
                // className="react-player"
                url={data.CourseContent_id.video}
                width="100%"
                // height="100%"
              />
            </div>
            <div className="text-xl font-semibold prose">
              {data.CourseContent_id.name}
              {/* <ProseGeneral content={data.CourseContent_id.name} /> */}
            </div>
          </article>
        </>
      )}
    </>
  )
}
