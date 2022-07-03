import { ArrowRight as ArrowRightIcon } from '@components/atoms/Icons'
import Link from 'next/link'

export default function ButtonGeneral({ id, item, color, collection }: any) {
  let coll = ''

  switch (collection) {
    case 'Posts':
      coll = 'blog/'
      break
    case 'Products':
      coll = item.type + 's/'
      break
  }

  return (
    <div key={id} className="py-3 mt-3 sm:mt-0 sm:flex-shrink-0">
      <Link
        href={
          ((item.slug === 'home' || item.slug === '') && '/') ||
          (collection === 'CustomLinks' ? item.slug : '/' + coll + item.slug)
        }
        className="cursor-auto"
        passHref
      >
        <a
          style={{ backgroundColor: color ? color : '#FFA439' }}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent shadow-md rounded-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"

          // className={`relative inline-flex items-center px-4 py-5 text-lg font-medium text-white border border-transparent rounded-xs shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800`}
        >
          <ArrowRightIcon className="w-6 h-6 mr-2 -ml-1" aria-hidden="true" />
          <span>{item.name}</span>
        </a>
      </Link>
    </div>
  )
}
