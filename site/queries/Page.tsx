import { fetchPostJSON } from '@lib/api-helpers'

const getPage = async (slug: string, brandName: string) => {
  // apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/items/brands?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_limit=3`
  // )

  const data = {
    query: `query {
            pages {
                id
                slug
                brand {
                    id
                    name
                    domain
                }
            }
        }`,
    variables: {
      brand: brandName,
    },
  }
  const response = await fetchPostJSON(process.env.GRAPHQL, data)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.data
}

export default getPage

const getPosts = async (slug: string, brandName: string) => {
  // apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/items/brands?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_limit=3`
  // )

  const data = {
    query: `query {
                posts {
                    id
                    slug
                    brand {
                        id
                        name
                        domain
                    }
                }
            }`,
    variables: {
      brand: brandName,
    },
  }
  const response = await fetchPostJSON(process.env.GRAPHQL, data)

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.data
}
