export default function SectionHeader({ data }: any) {
  return (
    <>
      {data && (
        <div className="mx-auto text-lg max-w-prose">
          <h1>
            {data.subtitle && (
              <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
                {data.subtitle}
              </span>
            )}
            {data.title && (
              <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                {data.title}
              </span>
            )}
          </h1>
        </div>
      )}
    </>
  )
}
