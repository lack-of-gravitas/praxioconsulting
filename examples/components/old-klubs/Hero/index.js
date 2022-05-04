import Link from "next/link";
import Image from "next/image";

import { ArrowRightIcon } from "@heroicons/react/outline";

const Hero = ({ data }) => {
  // get layout and theme properties from props
  let { header, buttons, image } = data;
  // console.log('formats',JSON.stringify(image))

  return (
    // <section className="text-gray-600 body-font py-40 flex justify-center items-center 2xl:h-screen">
    <section className="w-full h-screen relative text-white">
      <div>
        <div className="w-full h-screen relative text-white">
          {image && image.formats.xlarge ? (
            <Image
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={
                image.formats.xlarge
                  ? image.formats.xlarge.url
                  : image.formats.large.url
              }
              layout="fill"
              // height={
              //   image.formats.xlarge
              //     ? image.formats.xlarge.height
              //     : image.formats.large.height
              // }
              // width={
              //   image.formats.xlarge
              //     ? image.formats.xlarge.width
              //     : image.formats.large.height
              // }
              alt={image.name}
              priority
            />
          ) : (
            //

            <>
              <Image
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="https://via.placeholder.com/1280/0891B2/E2E8F0?text=Large+Image+Required"
                layout="fill"
                // height={1280}
                // width={900}
                alt=""
                priority
              />
            </>
          )}

          {/* <Image
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={image.formats.xlarge.url}
            layout="fill"
            // height={image.formats.xlarge.height}
            // width={image.formats.xlarge.width}
            // placeholder="blur"
            alt={image.name}
            priority // largest contentful paint element so prioritises load
          /> */}

          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center text-center px-12">
            <div>
              <h1 className="text-3xl md:text-6xl leading-tight font-bold">
                {header && header.title} <br className="hidden md:block" />
              </h1>
              <h4 className="text-xl md:text-3xl leading-tight mb-16">
                {header && header.subtitle}
              </h4>

              <div className="mt-8 lg:mt-0 lg:ml-8">
                {buttons?.map((button, index) => (
                  <div
                    key={index}
                    className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0 py-3"
                  >
                    <Link
                      href={button.link.href}
                      className="cursor-auto"
                      passHref
                    >
                      <button
                        type="button"
                        className="rounded-md shadow-lg relative inline-flex items-center px-4 py-5 border border-transparent text-lg font-medium rounded-md text-white bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                      >
                        <ArrowRightIcon
                          className="-ml-1 mr-2 h-6 w-6"
                          aria-hidden="true"
                        />
                        <span>{button.link.label}</span>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.defaultProps = {};

export default Hero;
