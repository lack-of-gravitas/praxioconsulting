import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const CardPost = dynamic(() => import('@components/molecules/Card/CardPost'))

export default function PostsRecent({ data, brand }: any) {
  // console.log('PostsRecent :', data)

  const getRecentPosts = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
          `?fields=id,slug,name,description,date_created,mainImage` +
          `&filter[brands][brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
          `&filter[status][_eq]=published` +
          `&sort[]=-date_created&limit=${data.limit ? data.limit : 3}`
      )
    ).json()

  let results: any = useQueries([
    { queryKey: 'recentPosts', queryFn: getRecentPosts, cacheTime: Infinity },
  ])

  let posts: any = []

  if (!results[0].isFetching) {
    posts = results[0].data.data
    // console.log('fetched posts: ', posts)
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
            {data.text && <ProseHeading content={data.text} />}

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-6">
              {posts.map((post: any) => (
                <CardPost key={post.id} data={post} brand={brand} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
