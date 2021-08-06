require('dotenv').config();

const ANALISIS_API = 'http://localhost:5555';
const CONTENT_MANAGER_API = 'http://localhost:8081';

export const ENV = {
  NODE_ENV: process.env.REACT_APP_NODE_ENV,
  TICKER: 'LSK',
  TREASURY_ADDRESS: 'a3b9b616f53864c20aca720bcbefec3586339c1d',
  ANALISIS_API,
  STORAGE_API: CONTENT_MANAGER_API,
  VIDEOS_CDN: `${ANALISIS_API}/cdn/videos`,
  IMAGES_CDN: `${ANALISIS_API}/cdn/images`
};
