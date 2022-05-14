import axios from 'axios';
import React, {  useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';

const Category = ({ cats, makeSlug }) => {


// Add cat Form 
const [ addForm, setAddForm] = useState(false);
const [ editForm, setEditForm] = useState(false);

// Input Cat Data

const [ cat, setCat ] = useState({
  name : '',
  id : ''
})

// delete data
const handleDelete = (id) => {
  axios.delete('http://localhost:5050/Categories/' + id)
}



// Handle Add form 
const handleAddForm = () =>  {
  setAddForm(true);
  setEditForm(false);
  setCat({
    name : '',
    id : ''
  })
}

// Handle Cat Form Submit

const handleCatFormSubmit = (e) => {

e.preventDefault();

let slug = makeSlug(cat.name);

axios.post('http://localhost:5050/Categories', {
id : '',
name : cat.name,
slug : slug
}).then(res => {
  setAddForm(false)
  setCat({
    name : '',
    id : ''
  })
});


}

/// cat data edit form 
const handleEditForm = (id) => {
  setAddForm(false);
  setEditForm(true)

  axios.get('http://localhost:5050/Categories/' + id ).then(res => {
    setCat({
      name : res.data.name,
      id : res.data.id
    })
  })
 }
// Update Cat
const handleCatUpdate = (e) => {
  e.preventDefault();
  let slug = makeSlug(cat.name);
  axios.patch('http://localhost:5050/Categories/' + cat.id, {
    name : cat.name,
    slug : slug
  }).then( res => {
    setCat({
      name : '',
      id : ''
    });
    setEditForm(false)
  })
}

  return (
    <>
    <h1>Category</h1>
    <hr />
    <Button variant='primary' onClick={ handleAddForm } className='btn-sm'>Create New Category</Button>
    <hr />
   
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
         cats.map((data, index) => 
         <tr>
         <td>{index + 1}</td>
         <td>{data.name}</td>
         <td>{data.slug}</td>
         <td>
           <Button variant='warning' onClick={ () => handleEditForm(data.id)} className='btn-sm' >Edit</Button>
           <Button variant='danger' onClick={ () => handleDelete(data.id)} className='btn-sm' >Delete</Button>
         </td>
       </tr>
         )
       }
      </tbody>
    </Table>
    {
      addForm && 

      <>
      <h2>Add new Category</h2>
      <hr />
            <Form onSubmit={ handleCatFormSubmit } >
              <Form.Group my={ 3 }>
                    <Form.Control type='tex' value={ cat.name } onChange={ e => setCat( { ...cat, name : e.target.value})} placeholder='Tag Name'/>
              </Form.Group>
              <br />
              <Form.Group my={ 3 }>
                  <Button type='submit' className='btn btn-sm btn-success'>Add</Button>
              </Form.Group>
          </Form>
        </>
    }
    {
      editForm && 

      <>
      <h2>Edit Category</h2>
      <hr />
            <Form onSubmit={ handleCatUpdate } >
              <Form.Group my={ 3 }>
                    <Form.Control type='tex' value={ cat.name } onChange={ e => setCat( { ...cat, name : e.target.value})} placeholder='Tag Name'/>
              </Form.Group>
              <br />
              <Form.Group my={ 3 }>
                  <Button type='submit' className='btn btn-sm btn-success'>Add</Button>
              </Form.Group>
          </Form>
        </>
    }
    </>
  )
}

export default Category;