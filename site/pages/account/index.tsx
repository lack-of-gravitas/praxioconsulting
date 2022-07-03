import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getAccount } from '@lib/queries'
import { useUser } from '@lib/hooks/useUser'
import { postData } from '@lib/api-helpers'
import { withAuthRequired, User } from '@supabase/supabase-auth-helpers/nextjs'
import { useState } from 'react'

const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)

export const getServerSideProps = withAuthRequired({
  redirectTo: '/account/signin',
})
export default function Account({ user }: { user: User }) {
  const [loading, setLoading] = useState(false)
  const { isLoading, subscription, userDetails } = useUser()

  return (
    <>
      <div className="bg-white">
        <div className="grid items-center max-w-2xl grid-cols-1 px-4 py-8 mx-auto gap-y-16 gap-x-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 lg:grid-cols-1">
          <div className="">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Purchases
            </h2>
            <p className="mt-4 text-gray-500"></p>
            <div className="flex mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-lg font-medium prose text-white bg-indigo-600 border border-transparent rounded-sm shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="ml-2">Stripe Customer Portal</span>
              </button>
            </div>
            <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="pt-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 hover:p-2 "
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                  <dd className="mt-4 text-sm text-gray-500">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="mr-2">Visit</span>{' '}
                      <span className="material-symbols-outlined">
                        keyboard_arrow_right
                      </span>
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:pb-24 lg:px-8">
          <div className="max-w-auto">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Purchases
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Your account information including (active) purchases and bonus
              content will be listed here. To manage your payment details
              including subscriptions, please use the Stripe Billing Portal.
            </p>
            <div className="flex mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-lg font-medium prose text-white bg-indigo-600 border border-transparent rounded-sm shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="ml-2">Stripe Customer Portal</span>
              </button>
            </div>
          </div>

          <div className="mt-16">
            <div className="space-y-20">
              <table className="w-full mt-4 text-gray-500 sm:mt-6">
                <caption className="sr-only">Products</caption>
                <thead className="text-sm text-left text-gray-500 sr-only sm:not-sr-only">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pr-8 font-normal sm:table-cell"
                    >
                      Status
                    </th>
                    <th scope="col" className="w-0 py-3 font-normal text-right">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm border-b border-gray-200 divide-y divide-gray-200 hover:bg-gray-100 sm:border-t">
                  {orders.map((order) => (
                    <div key={order.number}>
                      {order.products.map((product) => (
                        <tr key={product.id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="object-cover object-center w-16 h-16 mr-6 rounded"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.name}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {product.price}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.price}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {product.status}
                          </td>
                          <td className="py-6 font-medium text-right whitespace-nowrap">
                            <a
                              href={product.href}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              View
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Account.Layout = Layout

const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and powder coated steel card cover',
  },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
]

const orders = [
  {
    number: 'WU88191111',
    date: 'January 22, 2021',
    datetime: '2021-01-22',
    invoiceHref: '#',
    total: '$238.00',
    products: [
      {
        id: 1,
        name: 'Machined Pen and Pencil Set',
        href: '#',
        price: '$70.00',
        status: 'Lifetime Access',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
        imageAlt:
          'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
      },
      // More products...
    ],
  },
  {
    number: 'WU88191111',
    date: 'January 22, 2021',
    datetime: '2021-01-22',
    invoiceHref: '#',
    total: '$238.00',
    products: [
      {
        id: 1,
        name: 'Machined Pen and Pencil Set',
        href: '#',
        price: '$70.00',
        status: 'Lifetime Access',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
        imageAlt:
          'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
      },
      // More products...
    ],
  },
  {
    number: 'WU88191111',
    date: 'January 22, 2021',
    datetime: '2021-01-22',
    invoiceHref: '#',
    total: '$238.00',
    products: [
      {
        id: 1,
        name: 'Machined Pen and Pencil Set',
        href: '#',
        price: '$70.00',
        status: 'Lifetime Access',
        imageSrc:
          'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
        imageAlt:
          'Detail of mechanical pencil tip with machined black steel shaft and chrome lead tip.',
      },
      // More products...
    ],
  },
  // More orders...
]
