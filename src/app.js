const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const publicdirpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

// const aboutdirpath=path.join(__dirname,'../public/about.html')
// const helpdirpath=path.join(__dirname,'../public/help.html')
const app = express()
const port=process.env.PORT ||3000
app.use(express.static(publicdirpath))

app.set('view engine','hbs')//setup handle bar
app.set('views',viewspath)
hbs.registerPartials(partialspath)
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weatherx',
        name:"freak",
        age:17
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'chathan',
        name:'shuresh',
        age:10
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help me get out',
        name:'maathaparan',
        age:56
    })
})




app.get('/weather', (req, res) => {
    if(!req.query.address){
       return res.send({
            error:'no search'
        })

    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({forcast:forcastdata,
            location:location,
            address:req.query.address 

    })

        }
        
        )
    }
    
    )
    

    


    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send(
            {
                error:'your must provide search term'
            }
        )

    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'shit',
        errorm:'help article not found'

    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'salmanpary',
        errorm:'pagenot foudn'
    })
})



app.listen(port, () => {
    console.log('Server is up on port '+port)
})