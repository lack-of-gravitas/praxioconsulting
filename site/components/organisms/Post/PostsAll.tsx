import Link from 'next/link'
import Image from 'next/image'
import { SectionHeader } from '@components/molecules'

export default function PostsAll({ data, articles }: any) {
  // console.log("data //", data);
  // console.log("article //", articles.length);

  let { header, maxCount, columns } = data
  articles = articles.slice(0, maxCount)

  return (
    <>
      <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          {(data.title || data.subtitle) && (
            <SectionHeader
              title={data.title ? data.title : ''}
              subtitle={data.subtitle ? data.subtitle : ''}
            />
          )}

          {/* {header && (
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {header.title}
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                {header.text}
              </p>
            </div>
          )} */}

          {/* CARDS */}
          <div className="grid max-w-xl gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
            {articles?.map((article: any, index: any) => (
              <div
                key={index}
                className="max-w-2xl mx-auto overflow-hidden bg-white rounded-sm shadow-lg dark:bg-gray-800"
              >
                {article.image ? (
                  <Image
                    className="w-full pt-5 rounded-sm"
                    src={
                      article.image.formats.medium
                        ? article.image.formats.medium.url
                        : article.image.formats.small.url
                    }
                    layout="responsive"
                    height={
                      article.image.formats.medium
                        ? article.image.formats.medium.height
                        : article.image.formats.small.height
                    }
                    width={
                      article.image.formats.medium
                        ? article.image.formats.medium.width
                        : article.image.formats.small.height
                    }
                    alt={article.image.name}
                  />
                ) : (
                  //

                  <>
                    <Image
                      className="object-cover w-full h-64"
                      src="https://via.placeholder.com/150/0891B2/E2E8F0?text=No+Image+Set"
                      layout="responsive"
                      height={700}
                      width={700}
                      alt=""
                    />
                  </>
                )}

                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center">
                      {/* <div className="flex items-center">
                        <Image
                          className="object-cover rounded-full h-15"
                          src={article.author.picture.formats.thumbnail.url}
                          layout="intrinsic"
                          height={50}
                          width={50}
                          alt={article.author.picture.name}
                        />

                        <span
                          href="#"
                          className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
                        >
                          {"by " +
                            article.author.admin_user.firstname +
                            " " +
                            article.author.admin_user.lastname}
                        </span>
                      </div> */}
                      <span className="mx-1 text-xs text-right text-gray-600 dark:text-gray-300">
                        {new Date(article.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <a
                      href={'/blog/' + article.slug}
                      className="block mt-2 text-2xl font-semibold text-primaryColor-700 dark:text-white hover:text-gray-600 hover:underline"
                    >
                      {article.title}
                    </a>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

// const Articles = ({ data, articles }) => {
//   // console.log("data //", data);
//   // console.log("article //", articles);
//   const [pageNumber, setPageNumber] = useState(1)
//   const [currArticleIndex, setcurrArticleIndex] = useState(0)

//   let { header, maxCount, columns } = data

//   maxCount ? (maxCount = 4) : maxCount //=== 0 ? articles.length : (articles = articles.slice(0, maxCount));
//   let lastPage = Math.ceil(articles.length / 12) || 1 // 12 articles per page or just 1 page

//   const PageNumbers = () => {
//     return (
//       <>
//         <nav className="flex items-center justify-between px-4 mt-10 border-t border-gray-200 sm:px-0">
//           <div className="flex flex-1 w-0 -mt-px">
//             <button
//               className={`${
//                 pageNumber <= 1 ? 'cursor-not-allowed opacity-50' : ''
//               } border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-primaryColor-700 hover:border-gray-300`}
//               onClick={() => {
//                 setPageNumber(pageNumber - 1)
//                 setcurrArticleIndex(Math.min((currArticleIndex -= 12), 0))
//               }}
//               disabled={pageNumber <= 1}
//             >
//               <ArrowLeftIcon
//                 className="w-5 h-5 mr-3 text-primaryColor-700"
//                 aria-hidden="true"
//               />
//               Previous
//             </button>
//           </div>
//           {/* <div className="hidden md:-mt-px md:flex">
//             <a
//               href="#"
//               className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
//             >
//               1
//             </a>
//             {
//               // { Current: "border-primaryColor-500 text-primaryColor-700", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
//           }
//             <a
//               href="#"
//               className="inline-flex items-center px-4 pt-4 text-sm font-medium border-t-2 border-primaryColor-500 text-primaryColor-700"
//               aria-current="page"
//             >
//               2
//             </a>

//             <span className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent">
//               ...
//             </span>

//             <a
//               href="#"
//               className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
//             >
//               9
//             </a>
//             <a
//               href="#"
//               className="inline-flex items-center px-4 pt-4 text-sm font-medium text-gray-500 border-t-2 border-transparent hover:text-gray-700 hover:border-gray-300"
//             >
//               10
//             </a>
//           </div> */}
//           <div className="flex justify-end flex-1 w-0 -mt-px">
//             <button
//               className={`${
//                 pageNumber >= lastPage ? 'cursor-not-allowed opacity-50' : ''
//               } border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-primaryColor-700 hover:border-gray-300`}
//               onClick={() => {
//                 setPageNumber(pageNumber + 1)
//                 setcurrArticleIndex((currArticleIndex += 12))
//               }}
//               disabled={pageNumber >= lastPage}
//             >
//               Next
//               <ArrowRightIcon
//                 className="w-5 h-5 ml-3 text-primaryColor-700"
//                 aria-hidden="true"
//               />
//             </button>
//           </div>
//         </nav>
//       </>
//     )
//   }

//   return (
//     <>
//       <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
//         <div className="relative mx-auto max-w-7xl">
//           <div className="text-center">
//             <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
//               {header.title}
//             </h2>
//             <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
//               {header.text}
//             </p>
//           </div>

//           {/* CARDS */}
//           <PageNumbers />

//           <div className="grid max-w-xl gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
//             {articles &&
//               articles
//                 .slice(currArticleIndex, currArticleIndex + 12)
//                 .map((article, index) => (
//                   <Link key={index} href={`/blog/${article.slug}`} passHref>
//                     <div className="max-w-2xl mx-auto overflow-hidden bg-white rounded-sm shadow-lg cursor-pointer dark:bg-gray-800">
//                       {article.image ? (
//                         <Image
//                           className="object-cover w-full h-64"
//                           src={article.image.formats.small.url}
//                           layout="responsive"
//                           height={article.image.formats.small.height}
//                           width={article.image.formats.small.height}
//                           alt={article.image.name}
//                         />
//                       ) : (
//                         //

//                         <>
//                           <Image
//                             className="object-cover w-full h-64"
//                             src="https://via.placeholder.com/150/0891B2/E2E8F0?text=No+Image+Set"
//                             layout="responsive"
//                             height={700}
//                             width={700}
//                             alt=""
//                           />
//                         </>
//                       )}

//                       <div className="p-6">
//                         <div className="mb-4">
//                           <div className="flex items-center">
//                             {/* <div className="flex items-center">
//                             <Image
//                               className="object-cover rounded-full h-15"
//                               src={article.author.picture.formats.thumbnail.url}
//                               layout="intrinsic"
//                               height={50}
//                               width={50}
//                               alt={article.author.picture.name}
//                             />

//                             <span
//                               href="#"
//                               className="mx-2 font-semibold text-gray-700 dark:text-gray-200"
//                             >
//                               {"by " +
//                                 article.author.admin_user.firstname +
//                                 " " +
//                                 article.author.admin_user.lastname}
//                             </span>
//                           </div> */}
//                             <span className="mx-1 text-xs text-right text-gray-600 dark:text-gray-300">
//                               {new Date(
//                                 article.published_at
//                               ).toLocaleDateString()}
//                             </span>
//                           </div>
//                         </div>

//                         <div>
//                           <a
//                             // href={"/blog/" + article.slug}
//                             className="block mt-2 text-2xl font-semibold text-primaryColor-700 dark:text-white hover:text-gray-600 hover:underline"
//                           >
//                             {article.title}
//                           </a>
//                           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                             {article.excerpt}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//           </div>

//           {/* <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
//             {articles &&
//               articles
//                 .slice(currArticleIndex, currArticleIndex + 12)
//                 .map((article, index) => (
//                   <Article key={index} article={article} />
//                 ))}
//           </div> */}

//           <PageNumbers />
//         </div>
//       </div>
//     </>
//   )
// }

// export default Articles
