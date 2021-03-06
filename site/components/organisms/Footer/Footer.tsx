import { Link } from '@components/atoms'
import { Logo as DefaultLogo } from '@components/atoms'

export default function Footer({ data }: any) {
  // console.log('Footer: ', data)

  return (
    <>
      {data && (
        <footer className="bg-white" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <Link href="/">
                  <a className="flex items-center flex-initial font-bold md:mr-24">
                    <span className="flex mr-2">
                      {data.darkLogo ? (
                        <>
                          <DefaultLogo className="h-10" />
                        </>
                      ) : (
                        <span className="flex">
                          {data.name ? data.name : 'ACME'}
                        </span>
                      )}
                    </span>
                  </a>
                </Link>

                <p className="text-base text-gray-500">{data.tagline}</p>
                {/* <div className="flex space-x-6">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="w-6 h-6" aria-hidden="true" />
                    </a>
                  ))}
                </div> */}
              </div>

              <div
                className={`grid-cols-3 mt-12 grid gap-8 xl:mt-0 xl:col-span-2`}
              >
                {data.footer.map((column: any) => {
                  return (
                    <div key={column.sort} className="space-y-5">
                      <h3
                        style={{
                          color: data.accentColor
                            ? data.accentColor
                            : '#FFA439',
                        }}
                        className="font-semibold tracking-wider uppercase text-md "
                      >
                        {column.item.name}
                      </h3>
                      <ul className="space-y-4 smt-4">
                        {column.item.links.map(
                          ({ id, item, collection }: any) => {
                            let coll = ''

                            switch (collection) {
                              case 'Posts':
                                coll = 'blog/'
                                break
                              case 'Products':
                                coll = item.type + 's/'
                                break
                            }

                            return (
                              <li key={id}>
                                <Link
                                  href={
                                    ((item.slug === 'home' ||
                                      item.slug === '') &&
                                      '/') ||
                                    (collection === 'CustomLinks'
                                      ? item.slug
                                      : '/' + coll + item.slug)
                                  }
                                >
                                  <span className="text-base text-gray-500 cursor-pointer">
                                    {item.name}
                                  </span>
                                </Link>
                              </li>
                            )
                          }
                        )}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="pt-8 mt-12 border-t border-gray-200">
              <p className="text-base text-gray-400 xl:text-center">
                &copy; 2022 {data.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </>
  )
}
