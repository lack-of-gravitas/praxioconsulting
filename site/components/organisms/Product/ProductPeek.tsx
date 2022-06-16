export default function ProductPeek({ data }: any) {
  let { header, contents } = data
  // console.log("SneakPeek data -- ", data);

  return (
    <>
      {contents && (
        <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl">
                {header.title}
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                {header.text}
              </p>
            </div>

            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
              {contents.map((content: any, index: any) => (
                // <VideoCard key={index} content={content} />
                <></>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
