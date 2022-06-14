import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

export default function CardTeam({ data, genericData }: any) {
  // console.log('CardTeam :', data)
  // bb8b4b63-8ca3-4e7f-a2db-de4ac695f442
  console.log('CardTeam: ', data)
  // console.log('cardTeam: ', genericData ? genericData : 'no genericData')

  return (
    <>
      {data && (
        <>
          <div className="relative pb-5 group">
            <Link
              href={'/' + data.type + 's/' + data.slug}
              className=""
              passHref
            >
              <>
                <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  {data.directus_users_id.avatar &&
                  data.directus_users_id.avatar !== '' ? (
                    <Image
                      className="object-cover object-center w-full h-full"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.directus_users_id.avatar}`}
                      layout="responsive"
                      width={1153}
                      height={1153}
                      alt={data?.directus_users_id?.first_name || ''}
                      priority
                    />
                  ) : (
                    <Image
                      className="object-cover object-center w-full h-full"
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/bb8b4b63-8ca3-4e7f-a2db-de4ac695f442`}
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
                  {data.directus_users_id.first_name +
                    ' ' +
                    data.directus_users_id.last_name}
                </h3>
                <p className="font-semibold prose text-left text-gray-900 prose-base">
                  {data.directus_users_id.title}
                </p>
                <p className="prose text-left text-gray-900 prose-base">
                  {data.directus_users_id.description}
                </p>
              </>
            </Link>
          </div>
        </>
      )}
    </>
  )
}
