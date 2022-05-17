import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@components/molecules'
const Img = ({ className = '', ...props }) => {
  console.log(props)

  return (
    <div className="border-t border-b bg-accent-9 border-accent-2">
      {' '}
      <Container>
        <Image
          className="object-cover w-full h-64"
          // className={className}
          alt={'test'}
          {...props}
          //   unoptimized={false}
          src="https://via.placeholder.com/800"
          layout="fill"
          width={500}
          height={500}
        >
          {/* {children} */}
          {/* {loading && (
      <i className="flex pl-2 m-0">
        <LoadingDots />
      </i>
    )} */}
        </Image>{' '}
      </Container>
    </div>
  )
}

export default Img
