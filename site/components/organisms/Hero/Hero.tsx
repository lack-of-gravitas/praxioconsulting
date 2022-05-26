import React, { FC } from 'react'
import { Container } from '@components/molecules'
import { ArrowRight } from '@components/atoms/Icons'
import Link from 'next/link'
import Image from 'next/image'
interface HeroProps {
  data: any
}

const Hero: FC<HeroProps> = ({ data }) => {
  return (
    <div className="border-t border-b bg-accent-9 border-accent-2">
      <Container>
        <div>
          <div>
            <Link href="/">
              <a className="flex items-center pt-3 font-bold cursor-pointer text-accent-0 hover:underline w-max-content">
                Read it here HERO TEST
              </a>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Hero
