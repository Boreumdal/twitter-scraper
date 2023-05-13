import React from 'react'
import axios from 'axios'
import { NextResponse } from 'next/server'

const handler = async (request) => {
    try {
        const { id, nextToken, bearer, maximum } = await request.json()

        const config = {
            headers: { 
              'Authorization': `Bearer ${bearer}`
            }
        }

        const response = await axios.get(nextToken === '' ? `https://api.twitter.com/2/users/${id}/tweets?max_results=${maximum}&expansions=referenced_tweets.id` : `https://api.twitter.com/2/users/${id}/tweets?max_results=${maximum}&expansions=referenced_tweets.id&pagination_token=${nextToken}`, config)

        if (response){
            return NextResponse.json({ posts: response.data })
        }
        
    } catch (error){
        console.log(error)
        return NextResponse.json({ error })
    }
}

export { handler as POST }