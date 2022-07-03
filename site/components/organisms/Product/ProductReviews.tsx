import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)

const Review = dynamic(() => import('@components/molecules/Review/Review'))

export default function ProductReviews({ data, colors }: any) {
  const getdata = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Reviews` +
          `?fields=id,slug,name,sections.id,sections.sort,sections.collection,sections.item.*,sections.item.buttons.*,sections.item.buttons.item.slug,sections.item.buttons.item.name,sections.item.buttons.item.type,sections.item.items.item.id,sections.item.items.item.slug,sections.item.items.item.description,sections.item.items.item.name,sections.item.items.item.image,sections.item.items.item.type` +
          // `&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
          `&filter[id][_eq]=${data.item.id}`
      )
    ).json()

  return (
    <>
      {data && (
        <div className="bg-gray-50">
          <div className="px-4 py-12 mx-auto  max-w-7xl sm:px-6 lg:py-16 lg:px-8">
            <div className="relative z-10 p-12">
              <div className="text-center">
                {data.text && <ProseHeading content={data.text} />}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-12 text-center">
              {data.items?.map((review: any) => (
                <>
                  <Review data={review} colors={colors} />
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
