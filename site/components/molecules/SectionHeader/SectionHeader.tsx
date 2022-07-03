export default function SectionHeader({ data }: any) {
  return (
    <>
      {data && (
        <div className="mx-auto text-lg max-w-prose">
          {data.subtitle && (
            <p className="mt-2 text-3xl font-extrabold text-gray-800">
              {data.subtitle}
            </p>
          )}
          {data.title && (
            <h2 className="text-base font-semibold tracking-wide uppercase text-primaryColor-600">
              {data.title}
            </h2>
          )}
        </div>
      )}
    </>
  )
}
