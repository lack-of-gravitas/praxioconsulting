import Link from 'next/link'
import Image from 'next/image'

const Team = ({ data }: any) => {
  // console.log("Team -- ", data);
  let { header, members } = data

  return (
    <>
      <div className="bg-white">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {header.title}
            </h2>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {header.subtitle}
            </h2>
            <p className="text-xl text-gray-500">{header.text}</p>
            <ul
              role="list"
              className="space-y-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 lg:gap-y-12 lg:space-y-0"
            >
              {members.map((person: any) => (
                <li key={person.name}>
                  <div className="space-y-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:space-y-0 lg:gap-8">
                    <div className="h-0 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4">
                      {person.picture && (
                        <Image
                          className="object-cover rounded-sm shadow-lg"
                          src={person.picture.formats.small.url}
                          layout="fill"
                          // height={person.picture.formats.small.height}
                          // width={person.picture.formats.small.width}
                          alt={person.name}
                        />
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <div className="space-y-4">
                        <div className="space-y-1 text-xl font-medium leading-6">
                          <h3>{person.name}</h3>
                          <p className="font-medium text-primaryColor-700">
                            {person.job}
                          </p>
                        </div>
                        <div className="text-lg">
                          <p className="text-gray-500">{person.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

Team.defaultProps = {}

export default Team

const people = [
  {
    name: 'Whitney Francis',
    role: 'Copywriter',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
  },
  // More people...
]
