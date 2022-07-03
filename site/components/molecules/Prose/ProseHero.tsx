import parse from 'html-react-parser'

export default function ProseHero({ content }: any) {
  return (
    <div
      className={
        `"prose text-center  text-gray-800 ` +
        `prose-h1:text-4xl prose-h1:font-extrabold prose-h1:tracking-tight prose-h1:text-gray-800 sm:prose-h1:text-5xl md:prose-h1:text-6xl ` +
        `sm:prose-p:text-lg md:prose-p:mt-5 md:prose-p:text-2xl md:prose-p:max-w-3xl prose-p:max-w-md prose-p:mx-auto prose-p:mt-3 prose-p:text-xl`
      }
    >
      {parse(content)}
    </div>
  )
}
