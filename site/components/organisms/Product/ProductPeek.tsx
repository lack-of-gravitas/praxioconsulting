import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { useEffect } from 'react'

// get SectionData from API

export default function ProductPeek({ data, brand }: any) {
  // console.log("SneakPeek data -- ", data);

  return (
    <>
      {data && (
        <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              {/* {contents.map((content: any, index: any) => (
                <VideoCard key={index} content={content} />
                <></>
              ))} */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
