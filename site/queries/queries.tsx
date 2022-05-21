import { fetchPostJSON } from '@lib/api-helpers'

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

export async function getPage(slug: string) {
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

export async function getPostSummary(slug: string) {
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

export async function getPostDetail(slug: string) {
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
// id parameter of type integer
export async function getSection(id: number) {}
export async function getProductSummary(slug: string) {
  // get product summary first
  // https://klubs.azurewebsites.net/items/products?filter[slug][_eq]=couch-to-5km
  // https://klubs.azurewebsites.net/items/products?fields=*&filter[slug][_eq]=couch-to-5km

  // let apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/pages?_where[0][brand.domain]=${process.env.NEXT_PUBLIC_BRAND}&_where[1][slug]=${path}`
  // );

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

export async function getProductDetail(slug: string) {
  // get product summary first
  // https://klubs.azurewebsites.net/items/products?filter[slug][_eq]=couch-to-5km

  // then get all page sections pages vs products_sections are diff endpoints
  //https://klubs.azurewebsites.net/items/pages_sections?filter[id][_eq]=2
  //"_in": ["vegetables", "fruit"]
  //https://klubs.azurewebsites.net/items/products_sections?filter[id][_eq]=2
  // &filter[id][_eq]=2 -- gets specific section
  // &filter[products_id][_eq]=16 -- gets all sections associated to this page / product

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

export async function getImage(id: string, key?: string) {
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
