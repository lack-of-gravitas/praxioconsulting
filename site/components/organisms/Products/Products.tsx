import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/outline";

const Products = ({ data }) => {
  let { header, products, filter, slug, visible } = data;
  // console.log("<Products> data: ", products);

  return (
    <>
      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          {header && (
            <div className="text-center">
              <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
                {header.title}
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                {header.text}
              </p>
            </div>
          )}

          {/* CARDS */}
          <div className="mt-12 max-w-xl mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {products?.map((product, index) => (
              <div
                key={index}
                className="max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
              >
                {product.images && product.images.length > 0 ? (
                  <Image
                    className="object-cover w-full h-64"
                    src={
                      product.images[0].formats.medium
                        ? product.images[0].formats.medium.url
                        : product.images[0].formats.small.url
                    }
                    layout="responsive"
                    height={
                      product.images[0].formats.medium
                        ? product.images[0].formats.medium.height
                        : product.images[0].formats.small.height
                    }
                    width={
                      product.images[0].formats.medium
                        ? product.images[0].formats.medium.height
                        : product.images[0].formats.small.height
                    }
                    alt={product.images[0].name}
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
                  <div>
                    <a
                      href={`/` + slug + `/${product.slug}`}
                      className="block mt-2 text-2xl font-semibold text-primaryColor-700 dark:text-white hover:text-gray-600 hover:underline"
                    >
                      {product.name}
                    </a>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {product.description}
                    </p>
                  </div>
                </div>
                {product.slug && (
                  <div className="flex items-center justify-end px-4 py-2 bg-white">
                    <Link
                      href={`/` + slug + `/${product.slug}`}
                      className="cursor-auto"
                      passHref
                    >
                      <button
                        type="button"
                        className="rounded-md shadow-lg relative inline-flex items-center px-4 border border-transparent text-lg font-medium rounded-md text-white hover:text-white bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                      >
                        <ArrowRightIcon
                          className="-ml-1 mr-2 h-6 w-6"
                          aria-hidden="true"
                        />
                        <span className="p-3 px-5 rounded-md text-white cursor-pointer  ">
                          Learn More
                        </span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
