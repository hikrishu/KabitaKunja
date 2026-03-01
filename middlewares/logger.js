export const logger = (req,res,next)=> {
    const time = new Date().toISOString()
    console.log(req)
    console.log(`[${time}] ${req.method} ${req.originalUrl}`)
    next()
}