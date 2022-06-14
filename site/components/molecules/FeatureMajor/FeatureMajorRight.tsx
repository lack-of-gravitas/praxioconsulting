/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ProseHeading } from '@components/molecules'
const Button = dynamic(() => import('@components/atoms/Button/ButtonHero'))

export default function HeroRight({ data, genericData }: any) {
  return (
    <>
      {data && (
        <>
          {' '}
          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-4 md:grid-rows-2 md:h-1/2">
            <div className="relative h-64 md:h-auto md:col-span-2 md:row-span-2">
              {data.image && data.image !== '' ? (
                <Image
                  className="absolute inset-0 object-cover w-full h-full"
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                  layout="responsive"
                  width={1000}
                  height={900}
                  alt={data?.section_name || ''}
                  priority
                />
              ) : (
                <>
                  <Image
                    className="absolute inset-0 object-cover w-full h-full "
                    src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&w=1000&q=75"
                    layout="responsive"
                    width={1000}
                    height={900}
                    alt=""
                    priority
                  />
                </>
              )}

              {/* <img
           src="https://images.unsplash.com/photo-1605204376600-72ed73f1f9ec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2551&q=80"
           className="absolute inset-0 object-cover w-full h-full"
         /> */}
            </div>
            <div className="flex items-center justify-center text-center text-gray-700 md:col-span-2">
              <div className="relative z-10 p-12">
                <div className="text-center">
                  {data.text && <ProseHeading content={data.text} />}

                  <div className="justify-center mt-10 sm:flex">
                    {data.buttons?.map(({ id, item, collection }: any) => (
                      <Button key={id} item={item} collection={collection} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
