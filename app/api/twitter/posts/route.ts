import axios from 'axios';
import { NextResponse } from 'next/server';

const handler = async (request: Request) => {
    try {
        const { ids, bearer } = await request.json()

        const config = {
            headers: { 
              'Authorization': `Bearer ${bearer}`
            }
        }

        const response = await axios.get(`https://api.twitter.com/2/tweets?ids=${ids}&tweet.fields=attachments,author_id,created_at,entities,lang,source,text,conversation_id,in_reply_to_user_id,referenced_tweets&expansions=attachments.media_keys,author_id,in_reply_to_user_id,referenced_tweets.id&media.fields=preview_image_url,media_key,type,url&user.fields=created_at,description,id,location,name,url,username,verified,profile_image_url`, config)

        if (response){
            return new NextResponse(JSON.stringify({ posts: response.data }), {
                headers: {
                'Access-Control-Allow-Origin': 'https://twitter-scraper-drab.vercel.app',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              }
            })
        }

    } catch (error) {
        console.log(error);
    }
}

export { handler as POST }