import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import parse from 'html-react-parser'
import Link from 'next/link'

import {
  CollectionIcon,
  PencilAltIcon,
  AnnotationIcon,
  DownloadIcon,
} from '@heroicons/react/solid'

import { classNames } from '@lib/concat-classes'

const tabs = [
  { name: 'Show Notes', icon: AnnotationIcon, current: true },
  { name: 'Files', icon: CollectionIcon, current: false },
  { name: 'Transcript', icon: PencilAltIcon, current: false },
]

export default function MainContent({ data }: any) {
  console.log('MainContent: ', data)
  const [activeTab, setActiveTab] = useState('Show Notes')

  function RichText({ data }: any) {
    return (
      <>
        <div className="relative pt-5 pb-5 bg-gray-50 sm:px-6 lg:pt-5 lg:pb-10">
          <div className="relative max-w-full mx-auto mt-6 prose text-gray-500 prose-primaryColor prose-md">
            {parse(data)}
          </div>
        </div>
      </>
    )
  }

  function Files({ data }: any) {
    // console.log("Files: ", data);

    return (
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Download</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Caption
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((file: any, idx: any) => (
                    <tr
                      key={file.name}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                        <a
                          href={file.url}
                          download
                          className=" text-primaryColor-700 hover:text-primaryColor-900"
                        >
                          <DownloadIcon className="inline w-6 h-6 text-primaryColor-700" />{' '}
                          Download
                        </a>
                      </td>{' '}
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                        {file.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {file.alternativeText}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {file.caption}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      // <div className="relative px-4 pt-5 pb-5 bg-gray-50 sm:px-6 lg:pt-5 lg:pb-10 lg:px-8">
      //   <div className="relative mx-auto max-w-7xl">
      //     <div className="grid max-w-lg gap-5 mx-auto mt-5 lg:grid-cols-5 lg:max-w-none">
      //       {data.map((file) => {
      //         <div className="bg-gray-50 sm:rounded-lg">
      //           <div className="px-4 py-2 sm:p-6">
      //             <h3 className="text-base font-medium leading-6 text-gray-900">
      //               {file.name}
      //             </h3>

      //             <div className="mt-5">
      //               <Link
      //                 prefetch={false}
      //                 passHref
      //                 href={file.url}
      //                 type="button"
      //                 className="inline-flex items-center px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800 sm:text-sm"
      //               >
      //                 <a download>
      //                   <svg
      //                     xmlns="http://www.w3.org/2000/svg"
      //                     className="w-auto h-6 mr-3 sm:flex-shrink-0 sm:h-6"
      //                     fill="none"
      //                     viewBox="0 0 24 24"
      //                     stroke="currentColor"
      //                   >
      //                     <path
      //                       strokeLinecap="round"
      //                       strokeLinejoin="round"
      //                       strokeWidth="2"
      //                       d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      //                     />
      //                   </svg>
      //                   Download
      //                 </a>
      //               </Link>
      //             </div>
      //           </div>
      //         </div>;
      //       })}
      //     </div>
      //   </div>
      // </div>
    )
  }

  return (
    <>
      <div className="max-w-full mx-auto">
        <div className="pb-5 border-b border-gray-200">
          <h3 className="text-lg font-bold leading-6 text-gray-900">
            {data.title}
          </h3>
          <p className="max-w-full mt-2 text-base text-gray-500">
            {data.description}
          </p>
        </div>

        <div className="border-4 rounded-lg border-primaryColor-700 max-h-max">
          <div className="overflow-hidden ">
            <div className="aspect-w-16 aspect-h-9">
              <ReactPlayer
                controls={true}
                className="react-player"
                url={JSON.parse(data.video).url} //"https://www.youtube.com/watch?v=x_rDFa6kZfI"
                width="100%"
                height="100%"
              />
              {/* <div className="player-wrapper"></div> */}
            </div>
          </div>
        </div>
        <div className="max-w-full mx-auto ">
          <div className="py-4">
            <div className="pt-10">
              <h3 className="text-lg font-bold leading-6 text-gray-900">
                Supporting Content
              </h3>

              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
              </div>
              {/* DESKTOP */}
              <div className=" sm:block">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        className={classNames(
                          tab.name === activeTab
                            ? 'border-primaryColor-700 text-coolGray-700'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'cursor-pointer group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm'
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveTab(tab.name)
                        }}
                      >
                        <tab.icon
                          className={classNames(
                            tab.name === activeTab
                              ? 'text-coolGray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            '-ml-0.5 mr-2 h-5 w-5'
                          )}
                          aria-hidden="true"
                        />
                        <span>{tab.name}</span>
                      </a>
                    ))}
                  </nav>
                </div>
                {activeTab === 'Show Notes' && (
                  <RichText data={data.showNotes} />
                )}
                {activeTab == 'Transcript' && (
                  <RichText data={data.transcript} />
                )}
                {activeTab == 'Files' && <Files data={data.files} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
