import Image from 'next/image'

export default function CourseFooter({ data }: any) {
  const { themes, footer } = data
  return (
    <footer className="bg-white">
      <div className="px-4 py-12 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-center mt-8 space-x-6">
          {themes[0].logo ? (
            <Image
              className="h-4"
              src={themes[0].logo.formats.xsmall.url}
              layout="intrinsic"
              height={themes[0].logo.formats.xsmall.height - 15}
              width={themes[0].logo.formats.xsmall.height - 15}
              alt={themes[0].logo.name}
            />
          ) : (
            <>
              <Image
                className="block w-auto h-8 lg:hidden"
                src="https://via.placeholder.com/50/0891B2/E2E8F0?text=No+Image+Set"
                layout="intrinsic"
                height={48}
                width={48}
                alt=""
              />
            </>
          )}
        </div>
        <p className="mt-2 text-base text-center text-gray-400">
          {footer.bottomText}
        </p>
      </div>
    </footer>
  )
}
