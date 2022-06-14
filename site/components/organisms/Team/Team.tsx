import dynamic from 'next/dynamic'

import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from 'react-query'
import { PageNotFound } from '@components/templates'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const CardTeam = dynamic(() => import('@components/molecules/Card/CardTeam'))

export default function Team({ data, genericData }: any) {
  // console.log('Team :', data)
  // console.log('genericData: ', genericData.team)

  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
            {data.text && <ProseHeading content={data.text} />}

            {/* <h2 className="text-2xl font-extrabold text-gray-900">
              {data.text}
            </h2> */}

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
              {genericData.team.map((item: any) => (
                <CardTeam key={item.id} data={item} genericData={genericData} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
