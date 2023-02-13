

module.exports = class api {
  constructor() {

  }


  async getUserData(req, res, next) {
    const {user} = req.query;
    console.log(user)

    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');

      const data = await response.json();

      res.status(200).json({
        result: data,
      })
    } catch(err) {
      res.status(500).json({
        message: err,
      })
    }
    
    
    
  }

}