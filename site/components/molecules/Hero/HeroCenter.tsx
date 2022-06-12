/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Button = dynamic(() => import('@components/atoms/Button'))

export default function HeroCenter({ brand, data }: any) {
  return (
    <>
      {data && (
        <div className="relative overflow-hidden">
          <div className="relative pt-6 pb-16 sm:pb-24">
            <main className="px-4 mx-auto mt-8 max-w-7xl sm:mt-8">
              <div className="relative pt-6 pb-8 sm:pb-16">
                <div className="text-center">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Data to enrich your</span>
                    <span className="block text-indigo-600">
                      online business
                    </span>
                  </h1>
                  <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                </div>
              </div>
              <div className="relative max-w-md pb-8 mx-auto sm:pb-16">
                <div className="mt-5 sm:flex sm:justify-center md:mt-8">
                  <div className="shadow rounded-xs">
                    <a
                      href="#"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-xs hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get started
                    </a>
                  </div>
                  <div className="mt-3 shadow rounded-xs sm:mt-0 sm:ml-3">
                    <a
                      href="#"
                      className="flex items-center justify-center w-full px-8 py-3 text-base font-medium text-indigo-600 bg-white border border-transparent rounded-xs hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Live demo
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                {/* <div className="px-4 mx-auto max-w-7xl sm:px-6"> */}
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
                {/* </div> */}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  )
}
