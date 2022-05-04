import delve from "dlv";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";

const Cta = ({ data }) => {
  let { header, buttons } = data;
  return (
    <>
     
      <div className="bg-slate-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            <span className="block">{header?.title}</span>
            <span className="block text-primaryColor-700">{header?.subtitle}</span>
          </h2>
          {buttons ? (
            buttons.map((button, index) => (
              <div key={index} className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                {button.link ? (
                  <Link href={button.link.href} className="cursor-auto" passHref>
                    <button
                      type="button"
                      className="rounded-md shadow-lg relative inline-flex items-center px-4 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                    >
                      <ArrowRightIcon
                        className="-ml-1 mr-2 h-6 w-6"
                        aria-hidden="true"
                      />
                      <span>{button.link.label}</span>
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

Cta.defaultProps = {};

export default Cta;
