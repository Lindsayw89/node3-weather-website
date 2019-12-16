console.log('client side javascript is loaded')





const weatherForm =document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#msg1')
const messageTwo= document.querySelector('#msg2')

//messageOne.textContent= 'From JAvascript'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''

    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           messageOne.textContent = data.error
        }else{
                 messageOne.textContent = data.location
                 messageTwo.textContent = data.forecast
        }
     })
  })
})