import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
    windowMs: 15*60*100,    // 15 mins
    max: 100,    //map 100 req per IP per window
    message: "Too many request. Try again later!"
})

export default limiter