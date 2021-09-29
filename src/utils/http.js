import axios from 'axios';

const url =
  'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&uselang=user&prop=extracts%7Cpageprops%7Cinfo&generator=prefixsearch&redirects=1&exsentences=1&exintro=1&explaintext=1&inprop=url&gpssearch=STAR';

const getWikiData = async () => {
  try {
    const response = await axios.get(url);

    console.log('responsedata', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default getWikiData;
