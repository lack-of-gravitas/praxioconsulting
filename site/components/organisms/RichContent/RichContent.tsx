// import delve from "dlv";
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'

const RichContent = ({ header, content }: any) => {
  return (
    <>
      <div className="prose">{parse(content)}</div>
    </>
  )
}

RichContent.defaultProps = {}

export default RichContent
