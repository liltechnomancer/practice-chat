import React, { Component } from 'react'
import { map } from 'ramda'
import styled from 'react-emotion'

const Layout = styled('div')`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 95% 5%;
`

const MessageBox = styled('div')`
  overflow-y: scroll;
  grid-column: 1 / span 2;
`

const Form = styled('form')`
  display: grid;
  grid-template-columns: 100%;
  grid-column 1 / span 2;
  height: 100%;
  width: 100%;
`

const Submit = styled('input')`
  display: none;
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
          <Submit
            type="submit"
            value="Submit"
            onClick={e => {
              e.preventDefault()
              this.setState({ message: '' })
              this.props.handleSubmit(this.state.message)
            }}
          />
        </Form>
      </Layout>
    )
  }
}

export default Chat
