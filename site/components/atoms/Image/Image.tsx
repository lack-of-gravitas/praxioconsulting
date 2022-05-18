import { useState } from 'react'
import Image, { ImageProps as NextImageProps } from 'next/image'
import { LoadingDots } from '@components/atoms'

type ImageWithStateProps = NextImageProps & {
  fallback: string
  debug?: string
}

const ImageWithState: React.FC<ImageWithStateProps> = ({ src, ...props }) => {
  const [loading, setLoading] = useState(true)
  const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined)

  return (
    <div style={{ position: 'relative' }}>
      {loading === true && (
        <i className="flex pl-2 m-0">
          <LoadingDots />
        </i>
      )}
      <Image
        className={'rounded-sm ' + props.className || ''}
        alt={props.alt || 'Image'}
        // src={props.src || 'https://www.fillmurray.com/640/360'}
        layout={props.layout || 'fill'}
        height={props.height || '640'}
        width={props.width || '360'}
        // unoptimized={false}
        // https://dummyimage.com/640x360/fff/aaa
        {...props}
        src={onErrorSrc || src}
        onLoadingComplete={() => setLoading(false)}
        onError={(e) => handleOnError(e)}
      />
    </div>
  )

  function handleOnError(
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    e?.currentTarget?.src !== props.fallback && setOnErrorSrc(props.fallback)
  }
}

export default ImageWithState

// function img(props: ImageWithStateProps) {
//   const [loading, setLoading] = useState(true)
//   const [onErrorSrc, setOnErrorSrc] = useState<string | undefined>(undefined)

//   return (
//     <div style={{ position: 'relative' }}>
//       {loading === true && (
//         <i className="flex pl-2 m-0">
//           <LoadingDots />
//         </i>
//       )}
//       <Image
//         className={'rounded-sm ' + props.className || ''}
//         alt={props.alt || 'Image'}
//         // src={props.src || 'https://www.fillmurray.com/640/360'}
//         layout={props.layout || 'fill'}
//         height={props.height || '640'}
//         width={props.width || '360'}
//         // unoptimized={false}
//         // https://dummyimage.com/640x360/fff/aaa
//         {...props}
//         src={onErrorSrc || src}
//         onLoadingComplete={() => !props.debug && setLoading(false)}
//         onError={(e) => handleOnError(e)}
//       />
//     </div>
//   )

//   function handleOnError(
//     e: React.SyntheticEvent<HTMLImageElement, Event>
//   ): void {
//     e?.currentTarget?.src !== props.fallback && setOnErrorSrc(props.fallback)
//   }
// }
