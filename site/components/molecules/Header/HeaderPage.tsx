export default function HeaderPage({ data }: any) {
  return (
    <>
      <div className="relative pt-16 overflow-hidden bg-white">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="mx-auto text-lg max-w-prose">
            {data && (
              <div className="pb-5 prose border-b border-gray-200">
                {data.title && (
                  <h1 className="text-2xl font-extrabold tracking-tight prose text-gray-900 sm:text-3xl">
                    {data.title}
                  </h1>
                )}
                {data.subtitle && (
                  <h3 className="text-lg font-medium leading-6 prose text-gray-900">
                    {data.subtitle}
                  </h3>
                )}
                {data.description && (
                  <>
                    <p className="mt-2 text-sm prose text-gray-500 max-w-prose">
                      {data.description}
                    </p>
                  </>
                )}
                {data.date_created && (
                  <p className="max-w-4xl mt-2 text-sm prose text-gray-500">
                    <time dateTime="2020-08-25">
                      <span className="font-semibold">Published: </span>
                      {new Date(data.date_created).toLocaleDateString()}
                    </time>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
