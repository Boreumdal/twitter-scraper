import axios from 'axios';
import { NextResponse } from 'next/server';

const handler = async (request) => {
    try {
        const { ids, bearer } = await request.json()

        const config = {
            headers: { 
              'Authorization': `Bearer ${bearer}`
            }
        }

        const response = await axios.get(`https://api.twitter.com/2/tweets?ids=${ids}&tweet.fields=attachments,author_id,created_at,entities,lang,source,text,conversation_id,in_reply_to_user_id,referenced_tweets&expansions=attachments.media_keys,author_id,in_reply_to_user_id,referenced_tweets.id&media.fields=preview_image_url,media_key,type,url&user.fields=created_at,description,id,location,name,url,username,verified,profile_image_url`, config)

        if (response){
            return NextResponse.json({ posts: response.data })
        }

    } catch (error) {
        console.log(error);
    }
}

export { handler as POST }