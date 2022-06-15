import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { useState } from 'react'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const CardPost = dynamic(() => import('@components/molecules/Card/CardPost'))

export default function Posts({ data, brand }: any) {
  console.log('Blog :', data)
  // data.pagination
  const [page, setPage] = useState(0)

  const getPosts = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
          `?fields=id,slug,name,description,date_created,image` +
          `&filter[brands][brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
          `&filter[status][_eq]=published` //+
        // `&sort[]=-date_created&limit=${data.limit ? data.limit : 3}`
      )
    ).json()

  let results: any = useQueries([
    {
      queryKey: 'posts',
      queryFn: getPosts,
      cacheTime: Infinity,
    },
  ])

  let posts: any = []

  if (!results[0].isFetching) {
    posts = results[0].data.data
    console.log('fetched products: ', posts)
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
            {data.text && <ProseHeading content={data.text} />}

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {posts.map((item: any) => (
                <CardPost key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
