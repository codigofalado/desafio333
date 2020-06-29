import TwitterLite from 'twitter-lite';

const CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const CONSUMER_KEY_SECRET = process.env.TWITTER_CONSUMER_KEY_SECRET;
const API_TOKEN = process.env.TWITTER_TOKEN;
const API_TOKEN_SECRET = process.env.TWITTER_TOKEN_SECRET;

const TL = new TwitterLite({
	consumer_key: CONSUMER_KEY,
	consumer_secret: CONSUMER_KEY_SECRET,
	access_token_key: API_TOKEN,
	access_token_secret: API_TOKEN_SECRET,
	version: '1.1',
	subdomain: 'api'
});

export default TL;
