import React from 'react';
import PropTypes from 'prop-types';
import { Backend } from '../../../utils/queryServer';
import {
  Button,
  unstable_ProgressBar as ProgressBar,
} from 'carbon-components-react';

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
  active: 'Importing ...',
  error: 'Cancelled, error occurred.',
  finished: 'Successfully imported.',
};

export class StorageImportProgress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      status: null,
      progress_message: '',
      progress_value: 0.0,
    };
    this.getNextMessages = this.getNextMessages.bind(this);
  }
  render() {
    const value = Math.round(this.state.progress_value * 100);
    const status = this.state.status;
    return (
      <div className="storage-import-progress">
        <div>
          <ProgressBar
            status={status}
            label={IMPORT_STATUS_TITLE[status || 'active']}
            helperText={`${this.state.progress_message} (${value}%)${status === 'error' ? '. ' + this.state.messages[this.state.messages.length - 1] : ''}`}
            value={value}
          />
        </div>
        {this.props.showLog ? (
          <BottomDiv>
            {this.state.messages.map((message, index) => (
              <div key={index}>
                <code key={index}>{message}</code>
              </div>
            ))}
          </BottomDiv>
        ) : (
          ''
        )}
        {this.state.status === 'active' ? (
          ''
        ) : (
          <div>
            <Button kind="secondary" onClick={() => this.props.onSetTask(null)}>
              Import other data
            </Button>
          </div>
        )}
      </div>
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
        this.setState(
          {
            messages,
            status: progress.status,
            progress_message: progress.progress_message,
            progress_value: progress.progress_value,
          },
          () => {
            if (progress.status === 'active') {
              setTimeout(this.getNextMessages, 100);
            } else {
              this.props.onReload();
            }
          }
        );
      })
      .catch(error => {});
  }
}
StorageImportProgress.propTypes = {
  task: PropTypes.string.isRequired,
  onSetTask: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
  showLog: PropTypes.bool,
};
