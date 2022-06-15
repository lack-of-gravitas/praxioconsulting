import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const CardTeam = dynamic(() => import('@components/molecules/Card/CardTeam'))

export default function Team({ data, brand }: any) {
  // console.log('Team: ', data)

  const getTeam = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
          `?fields=team.id,team.sort,team.directus_users_id.first_name,team.directus_users_id.last_name,team.directus_users_id.title,team.directus_users_id.description,team.directus_users_id.avatar` +
          `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
      )
    ).json()

  let results: any = useQueries([
    { queryKey: 'team', queryFn: getTeam, cacheTime: Infinity },
  ])

  let team: any = []

  if (!results[0].isFetching) {
    team = results[0].data.data[0].team
    // console.log('fetched team: ', team)
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
            {data.text && <ProseHeading content={data.text} />}

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
              {team.map((item: any) => (
                <CardTeam key={item.id} data={item} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
