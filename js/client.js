const socket=io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageinput = document.getElementById('messageinp')
const messagecontainer = document.querySelector(".container")
var audio = new Audio('noti.mp3')
const append = (message, position )=>{
    const messageElement = document.createElement('div')
    messageElement.innerText= message ;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messagecontainer.append(messageElement)
    if(position=='left'){
    audio.play();
}

}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const message = messageinput.value;
    append(`YOU: ${message}`,'right')
    socket.emit('send',message);
    messageinput.value='';

})

const nam = prompt("enter your name top join");
socket.emit('new-user-joined', nam);

socket.on('user-joined', nam =>{
append(`${nam} joined the chat`,'right')
})

socket.on('receive', data =>{
    append(`${data.nam}: ${data.message}`,'left')

})

socket.on('left', nam =>{
    append(`${data.nam}: left the chat`,'left')
})