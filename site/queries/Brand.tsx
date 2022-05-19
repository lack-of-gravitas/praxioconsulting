import { fetchPostJSON } from '@lib/api-helpers'

// get brand details to populate header, footer, etc.kohl
const getBrand = async (brandName: string) => {
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

export default getBrand

const getBrandId = async (slug: string, brandName: string) => {
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
