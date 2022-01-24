const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=930a62d598a4fb4a6dc260e74b0d6656&query='+latitude+','+longitude+''
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('os level error',undefined)
        }
        else if(body.error){
            callback('no such location api',undefined)
        }
        else{
            callback(undefined,"it is currently "+body.current.temperature+"there is"+body.current.precip+"chance")
            

        }
    })
}
module.exports=forecast 