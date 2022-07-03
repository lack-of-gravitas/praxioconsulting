import dynamic from 'next/dynamic'
import { ProseHeading } from '@components/molecules'
const Button = dynamic(() => import('@components/atoms/Button/ButtonHero'))

export default function CallToActionCenter({ data, colors }: any) {
  return (
    <>
      {data && (
        <div className="bg-white">
          <div className="px-4 py-12 mx-auto text-center max-w-7xl sm:px-6 lg:py-16 lg:px-8">
            <div className="text-center">
              {data.text && <ProseHeading content={data.text} />}
            </div>

            <div className="flex justify-center mt-8">
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
