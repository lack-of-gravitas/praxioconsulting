import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const CardProduct = dynamic(
  () => import('@components/molecules/Card/CardProduct')
)

export default function ProductsAll({ data, brand }: any) {
  // console.log('ProductsAll :', data)

  const getProducts = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Products` +
          `?fields=id,slug,name,description,image,type` +
          `&filter[status][_eq]=published` +
          `&filter[type][_in]=${data.filter.slice(0, -1)}` +
          `&filter[brands][Brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
      )
    ).json()

  let results: any = useQueries([
    {
      queryKey: data.filter ? data.filter.slice(0, -1) : 'all',
      queryFn: getProducts,
      cacheTime: Infinity,
    },
  ])

  let products = []

  if (!results[0].isFetching) {
    products = results[0].data.data
    // console.log('fetched products: ', products)
  }

  return (
    <>
      <div className="bg-gray-100">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
            {data.text && <ProseHeading content={data.text} />}

            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {products.map((item: any) => (
                <CardProduct key={item.id} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
