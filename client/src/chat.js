import React, { Component } from 'react'
import { map } from 'ramda'

class Chat extends Component {
  constructor() {
    super()
    this.state = {
      message: ''
    }
  }
  handleMsgChange = val => {
    this.setState({ message: val })
  }
  render() {
    const allMessages = map(
      m => (
        <li>
          {m.username}: {m.text}
        </li>
      ),
      this.props.messages
    )
    return (
      <div>
        <ul>{allMessages}</ul>
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.handleMsgChange(e.target.value)}
        />
        <button onClick={_ => this.props.handleSubmit(this.state.message)}>
          Send
        </button>
      </div>
    )
  }
}

export default Chat
