/* This example requires Tailwind CSS v2.0+ */
import dynamic from 'next/dynamic'
import { ProseHero } from '@components/molecules'

const Button = dynamic(() => import('@components/atoms/Button/ButtonHero'))

export default function HeroTextOnly({ data, colors }: any) {
  return (
    <div className="relative overflow-hidden">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24">
          <div className="block text-center xl:inline">
            {data.text && <ProseHero content={data.text} />}

            <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
              {data.buttons?.map(({ id, item, collection }: any) => (
                <Button key={id} item={item} collection={collection} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
