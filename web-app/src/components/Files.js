import React, { Fragment, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Parse from 'parse';

const Files = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleAddItem = async () => {
    const imageFile = new Parse.File(image.name, image);
    const Item = Parse.Object.extend('Item');
    const item = new Item();

    item.set('title', title);
    item.set('image', imageFile);

    try {
      await item.save();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleGetItems = async () => {
    try {
      const queryItems = await new Parse.Query(Parse.Object.extend('Item'))
        .includeAll()
        .find();
      queryItems.forEach((item) => {
        console.log(
          'Item info ',
          item._getId(),
          item.get('title'),
          item.get('image'),
          item.get('image').url()
        );
      });
    } catch (error) {
      console.log('error ', error);
    }
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='display-3 text-primary mt-4'>Files</div>
        <Form>
          <label className='h4 mt-4'>Load a File</label>
          <Form.Group>
            <Form.Control
              type='text'
              name='title'
              placeholder='Enter Product Name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='file'
              onChange={(e) => setImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group>
          <Button className='mt-2' onClick={handleAddItem}>
            Add Item
          </Button>
          <Button className='mt-2 ml-2' onClick={handleGetItems}>
            Get Item
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Files;
