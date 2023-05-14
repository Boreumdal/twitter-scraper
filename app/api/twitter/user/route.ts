import axios from 'axios'
import { NextResponse } from 'next/server'

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
            return NextResponse.json({ user_id: response.data })
        }
        
    } catch (error){
        console.log(error)
        return NextResponse.json({ error })
    }
}

export { handler as POST }