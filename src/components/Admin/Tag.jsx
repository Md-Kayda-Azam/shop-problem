import React, { useState } from 'react'
import { Button, Form, Table, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Tag = ({ tags, makeSlug }) => {

  // edit tag state 
  const [ tag, setTag ] = useState({
    name : '',
    id : ''
  });


  const [ tagUdateForm, setTagUdateForm ] = useState(false);


  // tag delete handleler
const handleDelete = (id) => {
 axios.delete('http://localhost:5050/tags/' + id);
};

// handle Tag edit 
const handleTagEdit= (id) => {
  setTagUdateForm(true);
  axios.get('http://localhost:5050/tags/' + id).then(res => {
    setTag({
      ...tag,
      name : res.data.name,
      id : res.data.id
    })
  });
}

/// Form Submit Handler
const handleFormSubmit = (e) => {
  e.preventDefault();

   let slug = makeSlug(tag.name)

  axios.patch('http://localhost:5050/tags/' + tag.id, {
    name : tag.name,
    slug :slug
  }).then(res => {
    setTagUdateForm(false)
  })

}



  return (
    <>
    <h1>Tag</h1>
    <hr />
    <Link  className='btn btn-primary btn-sm' to="/admin/add-tag">Create New Tag</Link>
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
 

         {
           tags.map(( data, index )  => 
           <tr>
              <td>{ index + 1}</td>
              <td>{data.name}</td>
              <td>{data.slug}</td>
              <td>
                <Button variant='warning' onClick={ () => handleTagEdit(data.id)}  className='btn-sm' >Edit</Button>
                <Button variant='danger' onClick={ () => handleDelete(data.id)} className='btn-sm' >Delete</Button>
              </td>
         </tr>
           )
         }
      </tbody>
    </Table>
    {
      tagUdateForm &&
      <>
       <h3>Edit tag data</h3>
    <hr />
          <Form onSubmit={ handleFormSubmit }>
            <Form.Group my={ 3 }>
                  <Form.Control type='tex' value={tag.name} onChange={ e => setTag({...tag, name : e.target.value})} placeholder='Tag Name'/>
            </Form.Group>
            <br />
            <Form.Group my={ 3 }>
                <Button type='submit' className='btn btn-sm btn-success'>Update</Button>
            </Form.Group>
        </Form>
      </>

    }
   
    </>
  )
}

export default Tag;