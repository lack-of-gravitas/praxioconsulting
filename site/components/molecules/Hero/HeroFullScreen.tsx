/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Button = dynamic(() => import('@components/atoms/Button'))

export default function HeroFullScreen({ brand, data }: any) {
  return (
    <>
      {data && (
        <div className="relative w-full h-screen overflow-hidden ">
          {/* <img
            src="https://images.unsplash.com/photo-1438109491414-7198515b166b?w=1800"
            className="absolute top-0 left-0 object-cover w-full h-full"
          /> */}

          {data.image && data.image !== '' ? (
            <Image
              className="absolute top-0 left-0 object-cover w-full h-full"
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data?.image}`}
              layout="fill"
              // width={1800}
              // height={1600}
              alt={data?.section_name || ''}
              priority
            />
          ) : (
            <>
              <Image
                className="absolute top-0 left-0 object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1400"
                layout="fill"
                // width={1800}
                // height={1600}
                alt=""
                priority
              />
            </>
          )}

          <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-12 text-center">
            <div className="">
              <h1 className="mb-16 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl ">
                Data to enrich your online business
              </h1>
              <p className="max-w-md mx-auto mt-3 text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl ">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua.
              </p>

              <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8 ">
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
              <div className="relative pt-6 pb-16 sm:pb-24">
                <main className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
                  <div className="text-center">
                    <h1 className="">
                      <span className="block xl:inline"></span>{' '}
                      <span className="block text-indigo-600 xl:inline"></span>
                    </h1>
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
