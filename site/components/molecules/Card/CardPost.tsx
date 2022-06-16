import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const Button = dynamic(() => import('@components/atoms/Button/ButtonGeneral'))

export default function CardPost({ data, brand }: any) {
  // console.log('PostCard :', data)

  return (
    <>
      {data && (
        <>
          <Link href={'/blog/' + data.slug} className="" passHref>
            <div className="relative pb-5 cursor-pointer group">
              <>
                <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  {data.image && data.image !== '' ? (
                    <Image
                      className="object-cover object-center w-full h-full"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                      layout="responsive"
                      width={1153}
                      height={1153}
                      alt={data?.name || ''}
                      priority
                    />
                  ) : (
                    <Image
                      className="object-cover object-center w-full h-full"
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1153"
                      layout="responsive"
                      width={1153}
                      height={1153}
                      alt=""
                      priority
                    />
                  )}
                </div>
                <h3 className="mt-6 font-extrabold prose prose-lg text-left">
                  <span
                    // style={{ color: color ? color : '#FFA439' }}
                    className="absolute inset-0"
                  />
                  {data.name}
                </h3>
                {/* <p className="font-semibold prose text-left text-gray-700 prose-base">
                  <time dateTime={data.date_created}>
                    Published:{' '}
                    {new Date(data.date_created).toLocaleDateString()}
                  </time>
                </p> */}
                <p className="pb-5 prose text-left text-gray-800 prose-base">
                  {data.description}
                </p>
              </>
            </div>
          </Link>
        </>
      )}
    </>
  )
}
