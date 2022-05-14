import React from 'react'
import { Button, Table } from 'react-bootstrap';

const Dash = () => {
  return (
    <>
    <h1>Dash</h1>
    <Button variant='primary' className='btn-sm'>Create New Dash</Button>
    <hr />
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Men</td>
          <td>men</td>
          <td>
            <Button variant='info' className='btn-sm' >View</Button>
            <Button variant='warning' className='btn-sm' >Edit</Button>
            <Button variant='danger' className='btn-sm' >Delete</Button>
          </td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default Dash;