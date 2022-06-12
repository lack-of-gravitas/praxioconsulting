/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ProseHero } from '@components/molecules'
const Button = dynamic(() => import('@components/atoms/Button/ButtonHero'))

export default function HeroRight({ brand, data }: any) {
  return (
    <>
      {data && (
        <div className="relative overflow-hidden">
          <main className="flex flex-wrap w-full md:h-screen">
            <div className="w-full pt-6 md:pt-0 md:flex-1 md:order-last">
              {data.image && data.image !== '' ? (
                <Image
                  className="object-cover w-full h-64 md:h-full"
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                  layout="responsive"
                  width={1400}
                  height={1280}
                  alt={data?.section_name || ''}
                  priority
                />
              ) : (
                <>
                  <Image
                    className="object-cover w-full h-64 md:h-full"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400"
                    layout="responsive"
                    width={1400}
                    height={1280}
                    alt=""
                    priority
                  />
                </>
              )}
            </div>
            <div className="relative flex items-center justify-center w-full p-6 pb-12 md:p-12 md:w-5/12">
              <div className="relative w-full px-12 py-12 text-center md:p-0 md:text-right">
                {data.text && <ProseHero content={data.text} />}

                <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
                  {data.buttons?.map(({ id, item, collection }: any) => (
                    <Button key={id} item={item} collection={collection} />
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}
