import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';

import Constants from '../../Constants';

const { defaultValue: { emptyArray } } = Constants;

const _renderTableHeader = () => (
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.HeaderCell>Last Name</Table.HeaderCell>
      <Table.HeaderCell>Checked</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
);

const _mapTableContents = (itemData) => {
  const { id, firstName, lastName, checkbox } = itemData;
  const isChecked = checkbox ? 'Checked' : 'Not Checked';

  return (
    <Table.Row key={id}>
      <Table.Cell>{firstName}</Table.Cell>
      <Table.Cell>{lastName}</Table.Cell>
      <Table.Cell>{isChecked}</Table.Cell>
    </Table.Row>
  )
}

const _renderTableBody = (data) => (
  <Table.Body>
    {
      data.map((itemData) => {
        return _mapTableContents(itemData);
      })
    }
  </Table.Body>
)

const _renderTable = (data) => (
  <div>
    <Table singleLine>
      {_renderTableHeader()}
      {_renderTableBody(data)}
    </Table>
  </div>
);

const usePopulationData = (setFormData) => {
  useEffect(() => {
    axios.get('https://619fb26b1ac52a0017ba4a09.mockapi.io/fakeData')
      .then((response) => {
        setFormData(response.data)
      })
  }, [])
}

function Read() {
  const [data, setFormData] = useState(emptyArray);
  usePopulationData(setFormData);

  return _renderTable(data);
}

export default Read;
