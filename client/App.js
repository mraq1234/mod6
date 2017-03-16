import React, {Component} from 'react';
import io from 'socket.io-client';
import styles from './css/App.css';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      text: '',
      name: '',
      status: 'active'
    };
  }

  componentDidMount() {
    socket.on('message', message => this.messageReceive(message));
    socket.on('update', ({users}) => this.chatUpdate(users));
    this.focusTimer = setInterval(() => this.checkAndChangeStatus(), 10);
  }

  componentWillUnmount() {
    clearInterval(this.focusTimer);
  }

  checkAndChangeStatus() {
    const docFocused = document.hasFocus();
    if (!docFocused && this.state.status === 'active') {
      this.handleUserStatusChange('inactive');
    } else if (docFocused && this.state.status === 'inactive') {
      this.handleUserStatusChange('active');
    }
  }

  messageReceive(message) {
    const messages = [
      message, ...this.state.messages
    ];
    this.setState({messages});
  }

  chatUpdate(users) {
    this.setState({users});
  }

  handleMessageSubmit(message) {
    const messages = [
      message, ...this.state.messages
    ];
    this.setState({messages});
    socket.emit('message', message);
  }

  handleUserSubmit(name) {
    this.setState({name});
    socket.emit('join', name);
  }

  handleUserStatusChange(status) {
    const user = {
            id: socket.id,
            name: this.state.name,
            status
        }
    this.setState({status})
    socket.emit('updateStatus', user);
  }

  render() {
    return this.state.name !== ''
      ? this.renderLayout()
      : this.renderUserForm();
  }

  renderLayout() {
    return (
      <div className={styles.App}>
        <div className={styles.AppHeader}>
          <div className={styles.AppTitle}>
            ChatApp
          </div>
          <div className={styles.AppRoom}>
            App room
          </div>
        </div>
        <div className={styles.AppBody}>
          <UsersList users={this.state.users}/>
          <div className={styles.MessageWrapper}>
            <MessageList messages={this.state.messages}/>
            <MessageForm
              onStartTyping={status => this.handleUserStatusChange(status)}
              onMessageSubmit={message => this.handleMessageSubmit(message)}
              name={this.state.name}/>
          </div>
        </div>
      </div>
    );
  }
  renderUserForm() {
    return (<UserForm onUserSubmit={name => this.handleUserSubmit(name)}/>)
  }
};
export default App;