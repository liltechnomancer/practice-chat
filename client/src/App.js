import React, { Component } from 'react'
import { append } from 'ramda'
import Messages from './chat'
import './App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      room: '',
      connection: null,
      isInChat: false,
      messages: []
    }
  }

  recieveMessage = msg => {
    console.log(msg.data)
    this.setState({
      ...this.state,
      messages: append(JSON.parse(msg.data), this.state.messages)
    })
  }

  componentWillMount() {
    const connection = new WebSocket('wss://chat-fhsmuyaqod.now.sh')
    connection.onmessage = this.recieveMessage
    this.setState({ ...this.state, connection })
  }

  handleNameChange = val => {
    this.setState({ name: val })
    console.log(this.state.name)
  }

  handleRoomChange = val => {
    this.setState({ room: val })
    console.log(this.state.room)
  }

  sendMessage = msg => {
    const con = this.state.connection
    con.send(
      JSON.stringify({
        type: 'message',
        username: this.state.name,
        text: msg,
        room: this.state.room
      })
    )
  }

  handleSubmit = e => {
    const con = this.state.connection
    e.preventDefault()
    con.send(
      JSON.stringify({
        type: 'joinroom',
        username: this.state.name,
        room: this.state.room ? this.state.room : 'general'
      })
    )
    this.setState({ ...this.state, isInChat: true })
  }

  render() {
    if (!this.state.isInChat)
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Roll-Chat</h1>
            <p>
              A portfolio piece by <a href="http://lvrbrtsn.com">lvrbrtsn</a>
            </p>
          </header>
          <p className="App-intro">Please enter your name.</p>
          <form>
            <input
              type="text"
              value={this.state.name}
              placeholder="Enter your name"
              onChange={e => this.handleNameChange(e.target.value)}
            />
            <input
              type="text"
              value={this.state.room}
              placeholder="Enter the room name"
              onChange={e => this.handleRoomChange(e.target.value)}
            />
            <input type="submit" value="Submit" onClick={this.handleSubmit} />
          </form>
        </div>
      )
    return (
      <Messages
        messages={this.state.messages}
        handleSubmit={this.sendMessage}
      />
    )
  }
}

export default App
