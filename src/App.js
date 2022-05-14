import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './--assets/css/bundle.css';
import './--assets/css/style.css';
import AddTag from './components/Admin/AddTag';
import Category from './components/Admin/Category';
import Dash from './components/Admin/Dash';
import Dashbord from './components/Admin/Dashbord';
import Products from './components/Admin/Products';
import Product_add from './components/Admin/Product_add';
import Tag from './components/Admin/Tag';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './components/Pages/Home';
import ProductSingle from './components/Pages/ProductSingle';

import Shop from './components/Pages/Shop';

const App = () => {

    // tag state
    const [ tags, setTags ] = useState([]);
    // get all cats
    const [cats, setCats ] = useState([]);
    //// get product
    const [products, setProducts ] = useState([]);

      // slug Generate 
      const makeSlug =  (data) => {
        let arr =  data.split(' ');
        return arr.join('-').toLowerCase();
      }

    useEffect(() => {

      axios.get('http://localhost:5050/Categories').then(res => {
      setCats(res.data);
      });

  }, []);

    useEffect(() => {

      axios.get('http://localhost:5050/tags').then( res => {
        setTags(res.data.reverse());
      });

  }, []);

    useEffect(() => {

      axios.get('http://localhost:5050/Products').then(res => {
      setProducts(res.data);
      });

  }, []);


  // check    teat

  return (
  <>

     <Header/>
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='/shop' element={ <Shop products={products} setProducts={ setProducts } cats={cats} tags={tags}/>}/>
        <Route path='/shop/:slug' element={ <ProductSingle/>}/>
        <Route path='/admin' element={ <Dashbord/> } >
           <Route path='/admin/dash' element={ <Dash/>}/>
           <Route path='/admin/products' element={ <Products products={products}/>}/>
           <Route path='/admin/add-products' element={ <Product_add cats={ cats } tags={ tags } makeSlug={makeSlug}/>}/>
           <Route path='/admin/category' element={ <Category makeSlug={makeSlug} cats={cats}/>}/>
           <Route path='/admin/tag' element={ <Tag tags={tags} makeSlug={makeSlug}/>}/>
           <Route path='/admin/add-tag' element={ <AddTag/>}/>
         </Route>
      </Routes>
     <Footer/>

  </>  
  )
}

export default App