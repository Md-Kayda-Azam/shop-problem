import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = () => {


  // slug Generate 
  const makeSlug =  (data) => {
    let arr =  data.split(' ');
    return arr.join('-').toLowerCase();
  }

  const [pro, setPro ] = useState({
    name : '',
    id : ''
  });


  // form add
  const [ addform, setAddform ] = useState(false);
  const [ editform, setEditform ] = useState(false);

  const handleaddform = () => {
    setAddform(true);
    setEditform(false);
    setPro({
      name : '',
      id : ''
    })
  };


  /// form submit
    const handleSubmit = (e) => {
      let slug = makeSlug(pro.name)
      e.preventDefault();
      axios.post('http://localhost:5050/Products', {
        id : '',
        name : pro.name,
        slug : slug
      }).then(res => {
        setAddform(false);
        setPro({
          name : '',
          id : ''
        })
      })
    };

// get all products

const [pros, setPros ] = useState([])

useEffect(() => {
  axios.get('http://localhost:5050/Products').then(res => {
    setPros(res.data)
  })
},[pros])

/// Update Products
const handleUpdateSubmit = (e) => {
   e.preventDefault();
   let slug = makeSlug(pro.name)
  axios.patch('http://localhost:5050/Products/' + pro.id, {
    pro : pro.name,
    slug : slug
  }).then(res => {
    setPro({
      name : '',
      id : ''
    });
    setEditform(false)
  })
}

/// delete data
const handleDeletedata = (id) => {
  axios.delete('http://localhost:5050/Products/' + id)
}

/// pro data edit form

const handleeditform = (id) => {
  setEditform(true);
  setAddform(false);
  axios.get('http://localhost:5050/Products/' + id).then(res => {
    setPro({
      name : res.data.name,
      id : res.data.id
    })

  })
}


  return (
    <>
    <h1>Products</h1>
    <hr />
    <Link to='/admin/add-products' className='btn btn-primary btn-sm'>All Products</Link>
    <hr />

  
     

     </>
  )
}

export default Products;