import { FC, useRef, useEffect } from 'react'
// import { useUserAvatar } from '@lib/hooks/useUserAvatar'

interface Props {
  className?: string
  children?: any
}

const Avatar: FC<Props> = ({}) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>
  // let { userAvatar } = useUserAvatar()

  return (
    <div
      ref={ref}
      // style={{ backgroundImage: userAvatar }}
      className="inline-block w-8 h-8 transition-colors ease-linear border-2 rounded-full border-primary hover:border-secondary focus:border-secondary"
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  )
}

export default Avatar
