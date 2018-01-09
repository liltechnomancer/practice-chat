import React, { Component } from 'react'
import { map } from 'ramda'
import styled from 'react-emotion'

const Layout = styled('div')`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 90%;
  grid-template-columns: 90% 10%;
`

const MessageBox = styled('div')`
  overflow: scroll;
  grid-column: 1 / span 2;
`

const Form = styled('form')`
  grid-column 1 / span 2;
  height: 100%;
  width: 100%;
`

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
      <Layout>
        <MessageBox>
          <ul>{allMessages}</ul>
        </MessageBox>
        <Form>
          <input
            type="text"
            value={this.state.message}
            onChange={e => this.handleMsgChange(e.target.value)}
          />
          <button
            onClick={e => {
              e.preventDefault()
              this.props.handleSubmit(this.state.message)
            }}
          >
            Send
          </button>
        </Form>
      </Layout>
    )
  }
}

export default Chat
