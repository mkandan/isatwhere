const { TwitterApi } = require('twitter-api-v2')

const TwitterTests = () => {

    const client = new TwitterApi({
        appKey: process.env.REACT_APP_TWITTER_APIKEY,
        appSecret: process.env.REACT_APP_TWITTER_APIKEY_SECRET,
        accessToken: process.env.REACT_APP_TWITTER_ACCESS,
        accessSecret: process.env.REACT_APP_TWITTER_ACCESS_SECRET
    })

    const grabAuthLink = async () => {
        const authLink = await client.generateAuthLink(process.env.REACT_APP_TWITTER_CALLBACK_URL);
        const url2 = authLink.url

        const rwClient = client.readWrite//read-write privs
    }





    return (
        <>
            <h2>hello from twitter tests</h2>
            <button onClick={grabAuthLink}>get link</button>
        </>
    );
}

export default TwitterTests;