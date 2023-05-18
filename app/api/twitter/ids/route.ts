import { IdsInterface } from '../../../../types/all'
import axios, { AxiosResponse } from 'axios'
import { NextResponse } from 'next/server'

const origin = process.env.DEVELOPMENT_ENV === 'production' ? process.env.NEXT_PUBLIC_MAIN_URL : 'http://localhost:3000'

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
                    'Access-Control-Allow-Origin': origin!,
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