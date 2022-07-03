import dynamic from 'next/dynamic'
import { ProseHeading } from '@components/molecules'
const Button = dynamic(() => import('@components/atoms/Button/ButtonHero'))

export default function CallToActionJustified({ data, colors }: any) {
  return (
    <>
      {data && (
        <div className="bg-gray-50">
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <span className="block">
              {data.text && <ProseHeading content={data.text} />}
            </span>

            <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
              {data.buttons?.map(({ id, item, collection }: any) => (
                <Button key={id} item={item} collection={collection} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
