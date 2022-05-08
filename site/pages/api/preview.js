const Preview = async (req, res) => {
  // console.log("req: ", req.query);

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (
    req.query.secret !== process.env.PREVIEW_SECRET ||
    (req.query.slug != '' && !req.query.slug)
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // req:  {
  //   secret: 'ARNFCb9zrC9ZHm5hZzCigWivD40icS4s',
  //   slug: '/',
  //   locale: 'en',
  //   apiID: 'page', or product or article
  //   kind: 'collectionType'
  // }

  // Fetch the headless CMS to check if the provided `slug` exists
  // getPostBySlug would implement the required fetching logic to the headless CMS

  // get list of valid paths associated to this domain (built at runtime) can be a subset of all paths
  let dbQuery = `
    query getData($brand: String!, $slug: String) {
      pages (publicationState: PREVIEW, where: { brand:{domain: $brand},slug: $slug }) {slug}
      courses: products (publicationState: PREVIEW, where: { categories: {slug: "course"}, brands:{domain: $brand} }) {slug}
      services: products (publicationState: PREVIEW, where: {categories: {slug: "service"}, brands:{domain: $brand} }) {slug} 
      articles (publicationState: PREVIEW, where: { brands:{domain: $brand},slug: $slug }) {slug}
    }
   `

  let req2 = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `${dbQuery}`,
      variables: {
        brand: `${process.env.NEXT_PUBLIC_BRAND}`,
      },
    }),
  }
  // console.log('url: ', `${process.env.NEXT_PUBLIC_BACKEND}/graphql`);
  let res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/graphql`, req2)
  let results = await res2.json()
  let slug = ''

  if (results.data) {
    // console.log("results.data: ", results.data);
    if (results.data.pages && results.data.pages.length > 0) {
      results.data.pages.find((page, index) => {
        if (page.slug === req.query.slug) {
          slug = page.slug
          return true
        }
      })
    }
    if (results.data.articles && results.data.articles.length > 0) {
      results.data.articles.find((article, index) => {
        if (article.slug === req.query.slug) {
          slug = 'blog/' + article.slug
          return true
        }
      })
    }
    if (results.data.courses && results.data.courses.length > 0) {
      results.data.courses.find((course, index) => {
        if (course.slug === req.query.slug) {
          slug = 'courses/' + course.slug
          return true
        }
      })
    }
    if (results.data.services && results.data.services.length > 0) {
      results.data.services.find((service, index) => {
        if (service.slug === req.query.slug) {
          slug = 'services/' + service.slug
          return true
        }
      })
    }
  }

  // console.log("slug:", slug);
  // const post = await getPostBySlug(req.query.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!slug) {
    return res.status(401).json({ message: 'Invalid slug' })
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  // res.redirect(post.slug)
  // res.redirect(307, `${slug}`);
  slug === '/'
    ? res.writeHead(307, { Location: `/` })
    : res.writeHead(307, { Location: `/${slug}` })
  res.end()
}
export default Preview
