import { BackgroundDots } from '@components/atoms'
import { SectionHeader, Prose } from '@components/molecules'

export default function BasicContent({ data }: any) {
  return (
    <>
      <div className="relative py-16 overflow-hidden bg-white">
        <BackgroundDots />
        {data && (
          <div className="relative px-4 sm:px-6 lg:px-4">
            {(data.title || data.subtitle) && (
              <SectionHeader
                title={data.title ? data.title : ''}
                subtitle={data.subtitle ? data.subtitle : ''}
              />
            )}
            {data.content && <Prose content={data.content} />}
          </div>
        )}
      </div>
    </>
  )
}
