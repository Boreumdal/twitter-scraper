import axios, { AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

interface IdsInterface {
    id: string
    nextToken: string | null
    bearer: string
    maximum: string
}

const handler = async (request: Request) => {
    try {
        const { id, nextToken, bearer, maximum }: IdsInterface = await request.json()

        const config = {
            headers: { 
              'Authorization': `Bearer ${bearer}`
            }
        }

        const response: AxiosResponse = await axios.get(nextToken === '' ? `https://api.twitter.com/2/users/${id}/tweets?max_results=${maximum}&expansions=referenced_tweets.id` : `https://api.twitter.com/2/users/${id}/tweets?max_results=${maximum}&expansions=referenced_tweets.id&pagination_token=${nextToken}`, config)

        if (response){
            return new NextResponse(JSON.stringify({ posts: response.data }), {
                headers: {
                'Access-Control-Allow-Origin': 'https://twitter-scraper-drab.vercel.app',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              }
            })
        }
        
    } catch (error){
        console.log(error)
        return NextResponse.json({ error })
    }
}

export { handler as POST }