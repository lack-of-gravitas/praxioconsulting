import ReactPlayer from 'react-player'

import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
} from 'react'
import cn from 'clsx'
import s from './Video.module.css'

interface TextProps {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
  onClick?: () => any
}

type Variant = 'heading' | 'body' | 'pageHeading' | 'sectionHeading'

const Text: FunctionComponent<TextProps> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
  onClick,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
  }

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  return (
    <Component
      className={cn(
        s.root,
        {
          [s.body]: variant === 'body',
          [s.heading]: variant === 'heading',
          [s.pageHeading]: variant === 'pageHeading',
          [s.sectionHeading]: variant === 'sectionHeading',
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {/* <div
              className="relative w-full overflow-hidden embed-responsive embed-responsive-16by9"
              style={{ paddingTop: '56.25%' }}
            >
              <iframe
                className="absolute top-0 bottom-0 left-0 right-0 w-full h-full embed-responsive-item"
                src="https://www.youtube.com/embed/vlDzYIIOYmM?enablejsapi=1&origin=https%3A%2F%2Fmdbootstrap.com"
                allowFullScreen=""
                data-gtm-yt-inspected-2340190_699="true"
                id={240632615}
              />
            </div> */}

      {children}
    </Component>
  )
}

export default Text
