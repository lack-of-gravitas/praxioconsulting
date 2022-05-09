// export async function fetchGetJSON(url: string) {
//   try {
//     const data = await fetch(url).then((res) => res.json())
//     return data
//   } catch (err) {
//     throw new Error(err.message)
//   }
// }

export async function fetchPostJSON(url: any, data: any) {
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data || {}), // body data type must match "Content-Type" header
    })
    // console.log('fetch response: ', response);
    return await response.json() // parses JSON response into native JavaScript objects
  } catch (err) {
    throw new Error(err.message)
  }
}

export const getURL = () => {
  const url =
    process?.env?.URL && process.env.URL !== ''
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000'
  return url.includes('http') ? url : `https://${url}`
}

export const postData = async ({
  url,
  token,
  data,
}: {
  url: string
  token?: any
  data?: any
}) => {
  // export const postData = async ({ url, token, data }) => {
  console.log('posting,', url, token, data)

  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.log('Error in postData', { url, token, data, res })
    throw Error(res.statusText)
  }

  return res.json()
}
