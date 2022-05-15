import React from 'react'
import Link from 'next/link'

export default function Card({
  permalink,
  image,
  name,
  description,
  price,
}: any) {
  return (
    <Link href="/product/[permalink]" as={`/product/${permalink}`}>
      <a className="mb-5 cursor-pointer d-block font-color-black">
        <div
          className="mb-3"
          style={{
            paddingBottom: '125%',
            background: `url("${image}") center center/cover`,
          }}
        ></div>
        <p className="mb-2 font-size-subheader font-weight-medium">{name}</p>
        <p className="mb-2 font-color-medium">{description}</p>
        <p className="pb-2 font-size-subheader font-weight-medium borderbottom border-color-black">
          {price}
        </p>
      </a>
    </Link>
  )
}
