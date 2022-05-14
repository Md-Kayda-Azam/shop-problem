import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product_add = ({cats, tags, makeSlug}) => {


/// form data manage
const [inputs, setInputs ] = useState({
    name : '',
    regular_price : '',
    sale_price : '',
    decs : '',
    slug : '',
    rating : '',
    categoryId : '',
    tagId : '',
    photo : ''
});

console.log(inputs.name);

const handleProductAdd = (e) => {

e.preventDefault();

let slug = makeSlug(inputs.name);
  
console.log(inputs)

axios.post('http://localhost:5050/Products', {
    name : inputs.name,
    regular_price : inputs.regular_price,
    sale_price : inputs.sale_price,
    decs : inputs.decs,
    slug : slug,
    rating : inputs.rating,
    categoryId : inputs.categoryId,
    tagId : inputs.tagId,
    photo : inputs.photo
}).then(res => {
    setInputs({
        name : '',
        regular_price : '',
        sale_price : '',
        decs : '',
        slug : slug,
        rating : '',
        categoryId : '',
        tagId : '',
        photo : ''
    })
})

}



  return (
    <>
    <h1>Add new products</h1>
    <hr />
    <Link to='/admin/products' className='btn btn-primary btn-sm'>Add Products</Link>
   <hr />
   <Form onSubmit={ handleProductAdd }>
       <Form.Group>
           <Form.Label>Product Name</Form.Label>
           <Form.Control type='text' value={inputs.name} onChange={e => setInputs({...inputs, name : e.target.value})}/>
       </Form.Group>
       <Form.Group>
           <Form.Label>Reagular Price</Form.Label>
           <Form.Control type='text' value={inputs.regular_price} onChange={e => setInputs({...inputs, regular_price : e.target.value})}/>
       </Form.Group>
       <Form.Group>
           <Form.Label>Sale Price</Form.Label>
           <Form.Control type='text' value={inputs.sale_price} onChange={e => setInputs({...inputs, sale_price : e.target.value})}/>
       </Form.Group>
       <Form.Group>
           <Form.Label> Short Decs</Form.Label>
           <textarea className='form-control' value={inputs.decs} onChange={e => setInputs({...inputs, decs : e.target.value})}></textarea>
       </Form.Group>
       <Form.Group>
           <Form.Label> Rating</Form.Label>
           <Form.Control type='text' value={inputs.rating} onChange={e => setInputs({...inputs, rating : e.target.value})}/>
       </Form.Group>
       <Form.Group>
           <Form.Label> Category </Form.Label>
          <select className='form-control' value={inputs.tagId} onChange={e => setInputs({...inputs, tagId : e.target.value})}>
              <option value="">-select-</option>
              {
                  cats.map( data => 

                    <option value="{data.id}">{data.name}</option>
                )
              }
             
          </select>
       </Form.Group>
       <Form.Group>
           <Form.Label> Tags </Form.Label>
          <select className='form-control' value={inputs.categoryId} onChange={e => setInputs({...inputs, categoryId : e.target.value})}>
              <option value="">-select-</option>
              {
                  tags.map( data => 

                    <option value="{data.id}">{data.name}</option>
                )
              }
             
          </select>
       </Form.Group>
       <Form.Group>
           <Form.Label> Photo</Form.Label>
           <Form.Control type='text' value={inputs.photo} onChange={e => setInputs({...inputs, photo : e.target.value})}/>
       </Form.Group>
       <Form.Group className='my-5'>
           <button type='submit' className='btn btn-primary btn-sm'>Add Now</button>
       </Form.Group>
   </Form>
 
  


    </>
  )
}

export default Product_add;