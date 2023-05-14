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
            return NextResponse.json({ posts: response.data })
        }
        
    } catch (error){
        console.log(error)
        return NextResponse.json({ error })
    }
}

export { handler as POST }