import React from 'react';
import {
  FileUploader,
  Form,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
  TextInput,
  Button,
} from 'carbon-components-react';
import { Backend } from '../../../utils/queryServer';
import PropTypes from 'prop-types';

export class StorageImportForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  render() {
    return (
      <Form id="form-import-data" method="post" encType="multipart/form-data">
        <FormGroup legendText="File">
          <FileUploader
            id="import-storage"
            name="file"
            labelTitle="Data to import"
            labelDescription="Choose PKL file to import"
            buttonLabel="Choose file ..."
            iconDescription="Dismiss file"
            filenameStatus="edit"
            buttonKind="secondary"
          />
        </FormGroup>
        <FormGroup legendText="Resolve policy">
          <RadioButtonGroup
            name="resolve"
            defaultSelected="ignore"
            legendText="Select resolve policy for ID collisions">
            <RadioButton
              labelText="Ignore imported data"
              value="ignore"
              id="resolve-1"
            />
            <RadioButton
              labelText="Overwrite existing data with imported data"
              value="overwrite"
              id="resolve-2"
            />
            <RadioButton
              labelText="Bump version of imported data then add it"
              value="bump"
              id="resolve-3"
            />
          </RadioButtonGroup>
        </FormGroup>
        <FormGroup legendText="Experiment name (optional)">
          <TextInput
            id="name"
            name="name"
            labelText="Name of experiment to import"
            helperText="By default, whole file is imported"
          />
        </FormGroup>
        <FormGroup legendText="Experiment version (optional)">
          <TextInput
            id="version"
            name="version"
            labelText="Version of experiment to import"
            helperText="By default, whole file is imported"
          />
        </FormGroup>
        <Button kind="secondary" onClick={this.submit}>
          Import
        </Button>
      </Form>
    );
  }
  submit() {
    const form = new FormData(document.getElementById('form-import-data'));
    const backend = new Backend();
    backend
      .postForm('load', form)
      .then(response => this.props.onSetTask(response.task))
      .catch(error => window.alert(`${error.title}: ${error.description}`));
  }
}
StorageImportForm.propTypes = {
  onSetTask: PropTypes.func.isRequired,
};
