import parse from 'html-react-parser'

export default function ProseHeading({ content }: any) {
  return (
    <div
      className={
        `"prose  text-gray-800 ` +
        // h1
        `prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:text-gray-800 sm:prose-h1:text-5xl md:prose-h1:text-6xl ` +
        // h2
        `prose-h2:text-3xl prose-h2:font-extrabold prose-h2:tracking-tight prose-h2:text-gray-800 sm:prose-h2:text-4xl ` +
        // p
        `prose-p:text-xl prose-p:font-normal sm:prose-p:text-lg md:prose-p:mt-5 md:prose-p:text-2xl prose-p:mx-auto prose-p:mt-3 `
      }
    >
      {parse(content)}
    </div>
  )
}
