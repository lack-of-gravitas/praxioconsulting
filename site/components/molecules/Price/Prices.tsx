import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, Fragment } from 'react'

export default function Prices({ data, colors }: any) {
  // console.log('price data: ', data)
  const [prices, setPrices]: any = useState([])

  useEffect(() => {
    data.map(async (price: any) => {
      let priceInfo = await (
        await fetch(`https://api.stripe.com/v1/prices/${price.stripeId}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PRODUCTINFO}`, //basic vs bearer == oauth
            'Content-Type': 'application/json',
          },
        })
      ).json()
      // console.log('priceInfo-- ', priceInfo)
      // console.log('stripe-- ', price)
      price = { ...price, ...priceInfo }

      // https://stackoverflow.com/questions/37435334/correct-way-to-push-into-state-array
      setPrices((prices: any) => [...prices, price])
      // console.log('prices: ', prices)
    })
  }, [])

  return (
    <>
      {data && (
        <>
          <div
            className={`bg-white">
            <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-${
              data.length > 2 ? 3 : data.length
            } sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-${
              data.length > 2 ? 3 : data.length
            }`}
          >
            {prices.map((price: any) => (
              <div
                key={price.sort}
                className="border border-gray-200 divide-y divide-gray-200 rounded-sm shadow-md"
              >
                <div className="p-6">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">
                    {price.heading}
                  </h2>
                  <p className="mt-4 text-sm text-gray-500">{price.text}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      ${price.unit_amount / 100}
                    </span>{' '}
                    <span className="text-base font-medium text-gray-500">
                      {price.type === 'recurring'
                        ? '/' + price.recurring.interval
                        : '/one time'}
                    </span>
                  </p>
                  <a
                    // href={tier.href}
                    className="block w-full py-2 mt-8 text-sm font-semibold text-center text-white bg-gray-800 border border-gray-800 rounded-sm hover:bg-gray-900"
                  >
                    {price.button_text}
                  </a>
                </div>
                {price.attributes && (
                  <div className="px-6 pt-6 pb-8">
                    <h3 className="text-xs font-medium tracking-wide text-gray-900 uppercase">
                      Features
                    </h3>
                    <ul role="list" className="mt-6 space-y-4">
                      {price.attributes?.map((attribute: any) => (
                        <li key={attribute} className="flex space-x-3">
                          <span
                            aria-hidden="true"
                            className="flex-shrink-0 w-5 h-5 text-gray-900 material-symbols-outlined"
                          >
                            {attribute.icon}
                          </span>
                          <span className="text-sm text-gray-500">
                            {attribute.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  )
}
