import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddTag = () => {

  const [tag, setTag ] = useState();

// slug Generate 

const makeSlug =  (data) => {
  let arr =  data.split(' ');
  return arr.join('-').toLowerCase();
}


const handleSubmit =(e) => {
  e.preventDefault();
  let slug = makeSlug(tag);
  axios.post('http://localhost:5050/tags', {
   id : '',
   name : tag,
   slug : slug
  }).then( res => {
    setTag('')
  });

};


 

  return (
    <>
    <h1>Tag</h1>
    <hr />
    <Link  className='btn btn-primary btn-sm' to="/admin/tag">All Tags</Link>
    <hr />
   <Form onSubmit={ handleSubmit }>
       <Form.Group my={ 3 }>
            <Form.Control type='tex' value={tag} onChange={ e => setTag(e.target.value)} placeholder='Tag Name'/>
       </Form.Group>
       <br />
       <Form.Group my={ 3 }>
           <Button type='submit' className='btn btn-sm btn-success'>Add</Button>
       </Form.Group>
   </Form>
    </>
  )
}

export default AddTag;