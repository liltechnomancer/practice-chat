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
  margin: 1rem;
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

const Input = styled('input')`
  border-radius: 3px;
  border: 1px solid black;
  margin: 0.5rem;
`

const Message = styled('div')`
  display: block;
  margin: 0.5rem;
`

const Name = styled('div')`
  font-weight: bold;
`

const Text = styled('div')``

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
        <Message>
          <Name>{m.username}</Name>
          <Text>{m.text}</Text>
        </Message>
      ),
      this.props.messages
    )
    return (
      <Layout>
        <MessageBox>
          <div>{allMessages}</div>
        </MessageBox>
        <Form>
          <Input
            type="text"
            ref="msg"
            placeholder="Tell a tale..."
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
