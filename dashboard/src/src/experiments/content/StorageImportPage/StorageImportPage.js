import React from 'react';
import { FileUploader, Form, FormGroup } from 'carbon-components-react';

export class StorageImportPage extends React.Component {
  render() {
    return (
      <>
        <h4>Import data into database</h4>
        <p>TODO file</p>
        <p>TODO resolve</p>
        <p>TODO name</p>
        <p>TODO version</p>
        <Form>
          <FormGroup legendText={'something'}>
            <FileUploader
              id="import-storage"
              name="import-storage"
              labelTitle="Data to import"
              labelDescription="Choose PKL file to import ..."
              buttonLabel="Choose file"
              iconDescription="Dismiss file"
              role="button"
            />
          </FormGroup>
        </Form>
      </>
    );
  }
}
