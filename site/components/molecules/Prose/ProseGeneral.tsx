import parse from 'html-react-parser'

export default function Prose({ content }: any) {
  // console.log('content: ', content)
  return (
    <>
      {content && (
        <div className="mx-auto mt-6 prose prose-lg text-gray-500 max-w-prose lg:prose-lg">
          {parse(content)}
        </div>
      )}
    </>
  )
}
