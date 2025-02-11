let fakeButton = document.querySelector('.fakeBtn')
let realButton = document.querySelector('.realBtn')
fakeButton.addEventListener("mouseover",() => {
    fakeButton.style.bottom = Math.floor(Math.random() * 90)+'%'
    fakeButton.style.right = Math.floor(Math.random() * 90)+'%'
})

fakeButton.addEventListener('click',()=> {
    alert('Ахахахахахаха обманул, \nкнопка находится в левом верхнем углу,\nиспользуйте приближение на странице')
})

realButton.addEventListener('click',()=> {
    window.location.href = 'http://localhost:3000/page4'

})