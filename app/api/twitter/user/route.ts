import axios from 'axios'
import { NextResponse } from 'next/server'

const origin = process.env.DEVELOPMENT_ENV === 'production' ? 'https://twitter-scraper-drab.vercel.app' : 'http://localhost:3000'

const handler = async (request: Request) => {
    try {
        const { username, bearer } = await request.json()

        const config = {
            headers: { 
              'Authorization': `Bearer ${bearer}`
            }
        }

        
        
        const response = await axios.get(`https://api.twitter.com/2/users/by/username/${username}?user.fields=created_at,description,entities,id,location,name,url,username,verified,profile_image_url`, config)

        if (response){
            return new NextResponse(JSON.stringify({ user_id: response.data }), {
                headers: {
                'Access-Control-Allow-Origin': origin,
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