import React from 'react';
import PropTypes from 'prop-types';
import { StorageImportProgress } from './StorageImportProgress';
import { StorageImportForm } from './StorageImportForm';

export class StorageImportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: null };
    this.setTask = this.setTask.bind(this);
  }
  render() {
    return (
      <>
        <h4>Import data into database</h4>
        {this.state.task === null ? (
          <StorageImportForm onSetTask={this.setTask} />
        ) : (
          <StorageImportProgress
            task={this.state.task}
            onSetTask={this.setTask}
            onReload={this.props.onReload}
          />
        )}
      </>
    );
  }
  setTask(task) {
    this.setState({ task });
  }
}
StorageImportPage.propTypes = {
  onReload: PropTypes.func.isRequired,
};
