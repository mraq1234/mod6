import React, {Component} from 'react';
import styles from './css/MessageForm.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      status: 'active'
    };
  }

  changePropsAndState(userStatus) {
    this.props.onStartTyping(userStatus);
    this.setState({status: userStatus});
  }

  startTypingTimer() {
    if (this.state.status !== 'typing') this.changePropsAndState('typing');
    this.clock = setTimeout(()=> this.changePropsAndState('active'), 1000);
  }

  handleSubmit(e) {
    e.preventDefault();
    const message = {
      from : this.props.name,
      text : this.state.text
    };
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    clearTimeout(this.clock);
    this.startTypingTimer();
    this.setState({ text : e.target.value });
  }

  render() {
    return(
      <form className={styles.MessageForm} onSubmit={e => this.handleSubmit(e)}>
        <input
          className={styles.MessageInput}
          onChange={e => this.changeHandler(e)}
          value={this.state.text}
          placeholder='Message'
        />
      </form>
    );
  }
}

export default MessageForm;