

console.log("i dont know what im doing")

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.getElementById('message1')
const messagetwo=document.getElementById('message2')
// messageone.innerHTML='<h1>shit</h1>'
weatherform.addEventListener('click',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    console.log('testing')
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    return response.json()
}).then((data)=>{
    if(data.error){
        messageone.innerHTML=`<h3>${data.error}`
        console.log(data.error)
    }else{
        messageone.innerHTML=`<h3>${data.location}`
        messagetwo.innerHTML=`<h4>${data.forcast}`
        console.log(data.location)
        console.log(data.forcast)
    }
})
})