// import { NextApiRequest, NextApiResponse } from 'next'

// import { host } from '../lib/config'

// export default async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> => {
//   if (req.method !== 'GET') {
//     return res.status(405).send({ error: 'method not allowed' })
//   }

//   // cache robots.txt for up to 60 seconds
//   res.setHeader(
//     'Cache-Control',
//     'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
//   )
//   res.setHeader('Content-Type', 'text/plain')
//   res.write(`User-agent: *
// Sitemap: ${host}/api/sitemap.xml
// `)
//   res.end()
// }

import { GetServerSideProps } from 'next'
import { host } from 'lib/config'
import React from 'react'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.write({ error: 'method not allowed' })
    res.end()
    return {
      props: {}
    }
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
  )
  res.setHeader('Content-Type', 'text/plain')
  res.write(`User-agent: *
  Sitemap: ${host}/sitemap.xml
  `)
  res.end()
  return {
    props: {}
  }
}

const RobotsTxt: React.FC = () => null

export default RobotsTxt
