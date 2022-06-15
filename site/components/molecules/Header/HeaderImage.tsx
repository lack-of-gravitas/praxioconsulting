import Image from 'next/image'

export default function HeaderImage({ data }: any) {
  return (
    <>
      {data && (
        <>
          <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 group-hover:opacity-75 sm:aspect-w-3 sm:aspect-h-1 sm:h-64 lg:aspect-w-2 lg:aspect-h-1">
            {data.image && data.image !== '' ? (
              <Image
                className="object-cover object-center w-full h-full md:h-1/2"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                layout="fill"
                width={1153}
                height={1153}
                alt={data?.name || ''}
                priority
              />
            ) : (
              <Image
                className="object-cover object-center w-full h-full"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1153"
                layout="fill"
                width={1153}
                height={1153}
                alt=""
                priority
              />
            )}
          </div>
        </>
      )}
    </>
  )
}
