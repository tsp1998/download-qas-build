const axios = require('axios')

module.exports = async (req, res, next) => {
  try {
    console.log(`req.headers`, req.headers)
    const bearer = req.headers['authorization'] || ''

    if (!bearer) { throw new Error('No authorization token provided...') }
    
    const accessToken = bearer.split(' ')[1];
    
    if (!accessToken) { throw new Error('No authorization token provided...') }

    const res = await axios.get(`${process.env.jiraApiUrl}/3/myself`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })

    console.log(`res`, res)

    req.jiraUser = res.data;
    next();

  } catch (error) {
    next(error);
  }
}