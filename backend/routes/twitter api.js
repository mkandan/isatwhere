const router = require('express').Router();
const Twitter = require('twitter');
const TwitterLite = require('twitter-lite')

const client = new Twitter({
  consumer_key: process.env.REACT_APP_TWITTER_APIKEY,
  consumer_secret: process.env.REACT_APP_TWITTER_APIKEY_SECRET,
  access_token_key: process.env.REACT_APP_TWITTER_ACCESS,
  access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_SECRET,
  bearer_token: process.env.REACT_APP_TWITTER_BEARER,
})

const clientLite = new TwitterLite({
  subdomain: 'api',
  consumer_key: process.env.REACT_APP_TWITTER_APIKEY,
  consumer_secret: process.env.REACT_APP_TWITTER_APIKEY_SECRET,
  access_token_key: process.env.REACT_APP_TWITTER_ACCESS,
  access_token_secret: process.env.REACT_APP_TWITTER_ACCESS_SECRET,
  bearer_token: process.env.REACT_APP_TWITTER_BEARER
})

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.get('/auth', (req, res, next) => {
  console.log('in express router.post');
  try {
    const { oAuth_token, oAuth_secret } = req.body

    console.log('oAuth_secret: ', oAuth_secret);
    console.log('oAuth_token: ', oAuth_token);

    res.status(200).json({ success: true, token: 'hi token', secret: 'hi secret' })
    // res.status(200).send('yoyoy')
  }
  catch (error) {
    next(error)
  }
})

router.get('/verify_credentials', async (req, res) => {
  try {
    const { oauth_consumer_key, oauth_nonce, oauth_signature, oauth_signature_method, oauth_timestamp, oauth_token, oauth_version } = req.query

    const data = await client.get('account/verify_credentials.json', { include_entites: false, skip_status: true, include_email: false }) //no required params

    res.status(200).send(data)

    // const dataLite = await clientLite.get("account/verify_credentials")
    // return res.status(200).json(dataLite)

  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
