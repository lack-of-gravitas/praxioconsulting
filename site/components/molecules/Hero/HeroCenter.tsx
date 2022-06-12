/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import { ProseHero } from '@components/molecules'
const Button = dynamic(() => import('@components/atoms/Button/ButtonHero'))

export default function HeroCenter({ brand, data }: any) {
  return (
    <>
      {data && (
        <div className="relative overflow-hidden">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <main className="px-4 mx-auto mt-8 max-w-7xl sm:mt-8">
              <div className="relative pt-6 pb-8 sm:pb-16">
                <div className="text-center">
                  {data.text && <ProseHero content={data.text} />}
                </div>
              </div>
              <div className="relative max-w-md pb-8 mx-auto sm:pb-16">
                <div className="mt-5 sm:flex sm:justify-center md:mt-8">
                  {data.buttons?.map(({ id, item, collection }: any) => (
                    <Button key={id} item={item} collection={collection} />
                  ))}
                </div>
              </div>

              <div className="relative">
                {data.image && data.image !== '' ? (
                  <Image
                    className="object-cover w-full h-64 md:h-full"
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
                    layout="responsive"
                    width={1920}
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
                      width={1920}
                      height={1280}
                      alt=""
                      priority
                    />
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}
