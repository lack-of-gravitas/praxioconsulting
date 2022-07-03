import dynamic from 'next/dynamic'

const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)

const PageNotFound = dynamic(() => import('@components/templates/PageNotFound'))

export default function Account({ slug, preview }: any) {
  let vimeoShowcases: any = ['9313461', '8498518'] //product.videoLibraryFolders.split(",");

  // in useeffect
  // check customer login
  // check customer permissions
  // load permitted showcases

  // placeholder UI
  return (
    <>
      {vimeoShowcases && (
        <>
          <div className="bg-gray-100">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:py-32 lg:max-w-none">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Media Library
                </h2>
                <p className="mt-4 text-gray-500">
                  Great news! Your purchases give you access to this Media
                  Library with hundreds of hours of additional curated content.
                </p>
                <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                  {vimeoShowcases.map((showcase: any) => (
                    <div key={showcase} className="relative group">
                      <div
                        style={{
                          padding: '100% 0 0 0',
                          position: 'relative',
                        }}
                      >
                        <iframe
                          src={`https://vimeo.com/showcase/${showcase}/embed`}
                          allowFullScreen
                          frameBorder="0"
                          style={{
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                          }}
                        ></iframe>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

Account.Layout = Layout
