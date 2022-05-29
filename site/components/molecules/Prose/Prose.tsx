import parse from 'html-react-parser'

export default function Prose({ content }: any) {
  return (
    <div className="mx-auto mt-6 prose prose-lg text-gray-500 ">
      {parse(content)}
    </div>
  )
}
