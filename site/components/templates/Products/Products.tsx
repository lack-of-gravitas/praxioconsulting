const Products = ({ data }: any) => {
  // let { header, products, filter, slug, visible } = data
  // console.log("<Products> data: ", products);

  const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 1,
      name: 'Earthen Bottle',
      href: '#',
      color: 'Black',
      price: '$48',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt:
        'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      color: 'Black',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt:
        'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      color: 'Black',
      price: '$89',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt:
        'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      color: 'Black',
      price: '$35',
      imageSrc:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt:
        'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },
    // More products...
  ]

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="grid grid-cols-1 mt-6 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="relative group">
              <div className="w-full overflow-hidden bg-gray-200 rounded-sm min-h-80 aspect-w-1 aspect-h-1 group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="object-cover object-center w-full h-full lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

{
  /*  <>
    <div className="bg-white">
        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product: any) => (
              <a key={product.id} href={product.href} className="group">
                <div className="w-full overflow-hidden bg-gray-200 rounded-sm aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="object-cover object-center w-full h-full group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative mx-auto max-w-7xl">
          {header && (
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {header.title}
              </h2>
              <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
                {header.text}
              </p>
            </div>
          )}

        
          <div className="grid max-w-xl gap-5 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
            {products?.map((product: any, index: any) => (
              <div
                key={index}
                className="max-w-2xl mx-auto overflow-hidden bg-white rounded-sm shadow-lg dark:bg-gray-800"
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
                        className="relative inline-flex items-center px-4 text-lg font-medium text-white border border-transparent rounded-sm shadow-lg hover:text-white bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                      >
                        <ArrowRightIcon
                          className="w-6 h-6 mr-2 -ml-1"
                          aria-hidden="true"
                        />
                        <span className="p-3 px-5 text-white rounded-sm cursor-pointer ">
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
    </>*/
}

export default Products
