import React, { Fragment, useState } from 'react';
import Parse from 'parse';
import { Form, Button } from 'react-bootstrap';

const Users = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);

  //   Create User
  const handleAddUser = async () => {
    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    try {
      const res = await user.signUp();
      console.log('User: ', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  //   Login User
  const handleLoginUser = async () => {
    try {
      const user = await Parse.User.logIn(email, password);
      console.log('User: ', user.get('username'), user.get('email'));
    } catch (error) {
      console.log('error', error);
    }
  };

  // Get Current User
  const handleGetUser = async () => {
    const user = new Parse.User.current();
    try {
      console.log('User Info: ', user.get('username'), user.get('email'));
    } catch (error) {
      console.log('No user login');
    }
  };

  //   Login User
  const handleLogoutUser = async () => {
    try {
      const res = await Parse.User.logOut();
      console.log('Logout', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  //   Login Admin
  const handleLoginAdmin = async () => {
    try {
      const user = await Parse.User.logIn('admin@admin.com', '1234');
      console.log('User: ', user.get('username'), user.get('email'));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAddProduct = async () => {
    const user = new Parse.User.current();
    const role = await new Parse.Query(Parse.Role)
      .equalTo('users', user)
      .first();

    if (!role) {
      console.log('Not admin User');
      return;
    }

    var productACL = new Parse.ACL();

    productACL.setRoleWriteAccess(role, true);
    // productACL.setPublicWriteAccess(true);
    productACL.setPublicReadAccess(true);

    const Product = Parse.Object.extend('Product');
    const product = new Product();
    product.set('title', title);
    product.set('price', price);
    product.setACL(productACL);

    try {
      const res = await product.save();
      console.log('result ', res);
    } catch (error) {
      console.log('error ', error);
    }
  };

  return (
    <Fragment>
      <div className='container mt-4'>
        <div className='display-3 text-primary'>Users - Roles</div>
        <Form>
          <label className='h4 mt-3'>Create User</label>
          <Form.Group>
            <Form.Control
              type='text'
              name='username'
              placeholder='Enter User Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='password'
              name='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
        <Button variant='primary' className='mt-2' onClick={handleAddUser}>
          Create User
        </Button>
        <Button
          variant='primary'
          className='ml-2 mt-2'
          onClick={handleLoginUser}
        >
          Login User
        </Button>
        <Button variant='primary' className='ml-2 mt-2' onClick={handleGetUser}>
          Get Current User
        </Button>
        <Button
          variant='primary'
          className='ml-2 mt-2'
          onClick={handleLogoutUser}
        >
          Logout
        </Button>
        <Button
          variant='primary'
          className='ml-2 mt-2'
          onClick={handleLoginAdmin}
        >
          Login Admin
        </Button>
        <Form>
          <label className='h4 mt-4'>Handle Roles</label>
          <Form.Group>
            <Form.Control
              type='text'
              name='title'
              placeholder='Enter title of Product'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='text'
              name='price'
              placeholder='Enter price of Product'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant='primary' className='mt-2' onClick={handleAddProduct}>
            Add Product
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Users;
