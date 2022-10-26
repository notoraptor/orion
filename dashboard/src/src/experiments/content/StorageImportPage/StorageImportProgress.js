import React from 'react';
import PropTypes from 'prop-types';
import { Backend } from '../../../utils/queryServer';
import { Button } from 'carbon-components-react';

class BottomDiv extends React.Component {
  constructor(props) {
    super(props);
    this.bottomRef = React.createRef();
  }
  render() {
    return (
      <div className={`bottom-div ${this.props.className || ''}`}>
        {this.props.children}
        <div ref={this.bottomRef} />
      </div>
    );
  }
  componentDidMount() {
    this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}
BottomDiv.propTypes = {
  className: PropTypes.string,
};

const IMPORT_STATUS_TITLE = {
  run: 'Importing ...',
  fail: 'Cancelled, error occurred.',
  success: 'Successfully imported.',
};

export class StorageImportProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], status: null };
    this.getNextMessages = this.getNextMessages.bind(this);
  }
  render() {
    return (
      <>
        <h5>{IMPORT_STATUS_TITLE[this.state.status || 'run']}</h5>
        <BottomDiv>
          {this.state.messages.map((message, index) => (
            <div key={index}>
              <code key={index}>{message}</code>
            </div>
          ))}
        </BottomDiv>
        {this.state.status === 'run' ? (
          ''
        ) : (
          <p>
            <Button kind="secondary" onClick={() => this.props.onSetTask(null)}>
              Import other data
            </Button>
          </p>
        )}
      </>
    );
  }
  componentDidMount() {
    this.getNextMessages();
  }
  getNextMessages() {
    const backend = new Backend();
    backend
      .query(`import-status/${this.props.task}`)
      .then(progress => {
        const messages = [...this.state.messages, ...progress.messages];
        this.setState({ messages, status: progress.status }, () => {
          if (progress.status === 'run') {
            setTimeout(this.getNextMessages, 100);
          } else {
            this.props.onReload();
          }
        });
      })
      .catch(error => {});
  }
}
StorageImportProgress.propTypes = {
  task: PropTypes.string.isRequired,
  onSetTask: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};
