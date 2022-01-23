// const API_URL = process.env.REACT_APP_API_URL;

const API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_LOCAL_API_URL;

console.log('API URL', API_URL);

const REGEXFOREMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PROFILEIMAGEURLPATH = `data[0].attributes.profilePhoto.data.attributes.url`;
const PROFILEIMAGENAME = `data[0].attributes.name`;

// console.log(API_URL);
export { API_URL, REGEXFOREMAIL, PROFILEIMAGEURLPATH, PROFILEIMAGENAME };
