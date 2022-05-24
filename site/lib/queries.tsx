import { fetchPostJSON, fetchGetJSON } from '@lib/api-helpers'

// graphql better for specific fields and m2m / m2a fields as you can define joins
// rest api better for getting all fields

// get brand details to populate header, footer, etc.
export async function getBrand() {
  const query = {
    query: `query ($domain: String!)  {
      brands (filter:  {domain: { _eq: $domain }}) {
          id
          name
          domain
          tagline
          lightLogo {id}
          darkLogo {id}
          primaryColor
          accentColor
          homepage {slug}
          header {
              item {
                  ... on pages {slug,name}
                  ... on dynamic_links {slug: url, name}
                  ... on posts {slug, name}
                  ... on products {slug, name, type}
              }
          }
          footer {
            sort
            item {
              ... on footer_columns {
                id
                name
                links {
                  item {
                    ... on pages {slug,name}
                    ... on dynamic_links {slug: url, name}
                    ... on posts {slug, name}
                    ... on products {slug, name, type}
                  }
                }
              }
            }
          }
        }
      }`,
    variables: {
      domain: `${process.env.NEXT_PUBLIC_BRAND}`,
    },
  }

  const response = await fetchPostJSON(
    process.env.NEXT_PUBLIC_GRAPHQL_API,
    query
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.data
}

// get all team members for the brand
export async function getTeam() {
  const query = {
    query: `query ($domain: String!)  {
      brands (filter: {domain: { _eq: $domain }}) {
          team {
              item {
                  ... on directus_users {
                      first_name
                      last_name
                      title
                      description
                      avatar {
                          id
                          title
                      }
                  }
              }
          }   
      }
    }`,
    variables: {
      domain: `${process.env.NEXT_PUBLIC_BRAND}`,
    },
  }
  const response = await fetchPostJSON(
    process.env.NEXT_PUBLIC_GRAPHQL_API,
    query
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.data
}

export async function getPage(slug?: string) {
  const response = await fetchGetJSON(
    `${
      process.env.NEXT_PUBLIC_REST_API
    }/pages?fields=*,sections.*&filter[brand][domain][_eq]=${
      process.env.NEXT_PUBLIC_BRAND
    }&filter[slug][_eq]=${slug ? slug : 'home'}`
  )
  console.log(response)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.data
}

// id parameter of type integer
export async function getPageSection(id: number) {
  // https://klubs.azurewebsites.net/items/pages_sections?fields=*,item.*&filter[id][_eq]=3
}

export async function getPosts(slug: string) {
  //https://klubs.azurewebsites.net/items/posts?fields=slug,name,description,status,date_created,date_updated,mainImage,tags&filter[brands][brands_id][domain][_eq]=https://therunningklub.com
}

export async function getPost(slug: string) {
  // https://klubs.azurewebsites.net/items/posts?fields=slug,name,content,status,date_created,date_updated,mainImage,related_posts.*,tags,author.first_name,author.last_name,author.avatar&filter[brands][brands_id][domain][_eq]=https://therunningklub.com
}

export async function getProducts(slug: string, type?: string) {
  // https://klubs.azurewebsites.net/items/products?fields=id,status,slug,name,stripeId,type,description,image.id&filter[brands][brands_id][domain][_eq]=https://therunningklub.com&filter[type][_in]=course,Service
}

export async function getProduct(slug: string) {
  // get product summary first
  // https://klubs.azurewebsites.net/items/products?filter[slug][_eq]=couch-to-5km

  // then get all page sections if includeDetail is set, pass to getSection
  //https://klubs.azurewebsites.net/items/pages_sections?filter[id][_eq]=2

  const query = {
    query: `query {
        }`,
    variables: {
      domain: `${process.env.NEXT_PUBLIC_BRAND}`,
    },
  }
  const response = await fetchPostJSON(
    process.env.NEXT_PUBLIC_GRAPHQL_API,
    query
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.data
}

export async function getProductSection(id: number) {
  //https://klubs.azurewebsites.net/items/products_sections?filter[id][_eq]=2
  // &filter[id][_eq]=2 -- gets specific section
  // &filter[products_id][_eq]=16 -- gets all sections associated to this page / product
}
