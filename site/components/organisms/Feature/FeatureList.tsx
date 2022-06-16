import { ProseHeading } from '@components/molecules'

export default function FeatureList({ data, brand }: any) {
  return (
    <>
      {data && (
        <div className="bg-white">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              {data.text && <ProseHeading content={data.text} />}
            </div>
            <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {data.items &&
                data.items.map((item: any) => (
                  <>
                    <div key={item.heading} className="relative">
                      <dt>
                        <span
                          aria-hidden="true"
                          className="absolute w-6 h-6 text-green-500 material-symbols-outlined"
                        >
                          {item.icon}
                        </span>

                        <p className="text-lg font-medium leading-6 text-gray-800 ml-9">
                          {item.heading}
                        </p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500 ml-9">
                        {item.text}
                      </dd>
                    </div>
                  </>
                ))}
            </dl>
          </div>
        </div>
      )}
    </>
  )
}
