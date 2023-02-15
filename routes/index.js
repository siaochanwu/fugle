const express = require('express');
const router = express.Router();
const api = require('../Controllers/api');
const Api = new api();
const { RateLimiterMemory } = require("rate-limiter-flexible");


const rateLimiter = new RateLimiterMemory(
{
  points: 10,
  duration: 60,
});

const userrateLimiter = new RateLimiterMemory(
  {
    points: 5,
    duration: 60,
  });

const rateLimiterMiddleware = (req, res, next) => {

  rateLimiter.consume(req.ip)
    .then((rateLimiterRes) => {
      userrateLimiter.consume(req.query.user)
      .then((userrateLimiterRes) => {
        next();
      })
      .catch((rejRes) => {
        console.log(rejRes)
        res.status(429).json({
          id: rejRes.consumedPoints
        });
      });
    })
    .catch((rejRes) => {
      console.log(rejRes)
      res.status(429).json({
        ip: rejRes.consumedPoints,
      });
    });
};

router.get('/data', rateLimiterMiddleware, Api.getUserData);

module.exports = router;
