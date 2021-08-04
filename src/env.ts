require('dotenv').config();

const PREDICTION_API = 'http://localhost:5555';
const CONTENT_MANAGER_API = 'http://localhost:8081';

export const ENV = {
  NODE_ENV: process.env.REACT_APP_NODE_ENV,
  TICKER: 'LSK',
  TREASURY_ADDRESS: 'a3b9b616f53864c20aca720bcbefec3586339c1d',
  PREDICTION_API,
  CONTENT_MANAGER_API,
  VIDEOS_CDN: `${PREDICTION_API}/cdn/videos`,
  IMAGES_CDN: `${PREDICTION_API}/cdn/images`
};
