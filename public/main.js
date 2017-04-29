import {LOBBY, USER_JOINED, MESSAGE_SEND} from '../chat/constants_chat'

const socket = io()

const appendMessage = message => {
  $('.message').append(message)
}

const messageElement = ({user, message}) =>
  $('<div>', {class: 'message'})
  .text(message)
  .prepend(userElement( user ))

const userElement = userName =>
  $('<span>', {class: 'user'}).text(userName)[0]

const userJoined = data =>
  appendMessage(messageElement(Object.assign(data, {message:'joined'})))

const messageReceived = data =>
  appendMessage(messageElement(
    Object.assign(data, {user: '${data.user} said'})
  ))//end messageReceived

const initializeSocket = () => {
  socket.on(USER_JOINED, userJoined)
  socket.on(MESSAGE_SEND, messageReceived)
}//end initializeSocket

$(document).ready( () => {
  let user = 'anonymous'
  
  //used for testing since cannot get username from database
  $('initial-form button').click(event => {
    user = $('#who-are-you').val()
   
    $('#initial-form').hide()
    $('#chat-area').show()

    initializeSocket()
    socket.emit(USER_JOINED, {user})

    return false
  })//end initial-form

  $('#chat-area button').click(event => {
    const message = $('#chat-area input').val()
    $('#chat-area input').val('')
  
    socket.emit(MESSAGE_SEND, {user, message})
  })//end chatarea
})//end frontend
    
