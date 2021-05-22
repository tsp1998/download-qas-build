function getQueryParams(url = '') {

  if (url.indexOf('?') < 0) {
    return {}
  }

  const queryString = url.substring(url.indexOf('?') + 1)
  if (queryString) {
    const pairs = queryString.split('&');
    return pairs.reduce((acc, curr) => {
      const [key, value = ''] = curr.split('=');
      return { ...acc, [key]: value };
    }, {})
  }

  return {};
}

export default getQueryParams