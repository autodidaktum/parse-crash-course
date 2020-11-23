import React, { Fragment, useState } from 'react';
import Parse from 'parse';
import { Form, Button } from 'react-bootstrap';

const Objects = () => {
  // Add an Object
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(new Date());
  // Query an Object
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchDate, setSearchDate] = useState(new Date());
  // Relations
  const [comment, setComment] = useState('');
  const [site, setSite] = useState('');

  // Add an Object
  const handleAddPost = async () => {
    const Post = Parse.Object.extend('Post');
    const post = new Post();

    post.set('title', title);
    post.set('description', description);
    post.set('author', author);
    var dateFormat = new Date(date);
    post.set('date', dateFormat);

    try {
      const res = await post.save();
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearchAuthor = async () => {
    const Post = Parse.Object.extend('Post');
    const queryPost = new Parse.Query(Post);
    // By Strings
    // queryPost.equalTo('author', searchAuthor);
    queryPost.startsWith('author', searchAuthor);

    try {
      const res = await queryPost.find();
      console.log('Search by Author', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSearchDate = async () => {
    const Post = Parse.Object.extend('Post');
    const queryPost = new Parse.Query(Post);

    // Query Constraints, limiting the number of results
    queryPost.limit(10);
    // Useful for pagination
    queryPost.skip(10);

    const dateFormated = new Date(searchDate);
    // By Constrains
    // queryPost.greaterThan('date', dateFormated);
    // queryPost.greaterThanOrEqualTo('date', dateFormated);
    // queryPost.lessThan('date', dateFormated);
    queryPost.lessThanOrEqualTo('date', dateFormated);

    try {
      const res = await queryPost.find();
      console.log('Search by Date', res);
      // Counting Objects
      const count = await queryPost.count();
      console.log('Number of entries found: ', count);
    } catch (error) {
      console.log('error', error);
    }
  };

  // Relation One-to-Many
  const handleAddComment = async () => {
    const Post = Parse.Object.extend('Post');
    const queryPost = new Parse.Query(Post);
    queryPost.equalTo('objectId', 'ga0uEVGO4F');

    const Comment = Parse.Object.extend('Comment');
    const myComment = new Comment();
    myComment.set('description', comment);

    try {
      const myPost = await queryPost.find();
      myComment.set('post', myPost[0]);

      const res = await myComment.save();
      console.log('result', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  // Relation One-to-Many get the comments
  const handleGetComment = async () => {
    const Post = Parse.Object.extend('Post');
    const queryPost = new Parse.Query(Post);
    queryPost.equalTo('objectId', 'ga0uEVGO4F');

    try {
      const myPost = await queryPost.find();

      const Comment = Parse.Object.extend('Comment');
      const queryComment = new Parse.Query(Comment);
      queryComment.equalTo('post', myPost[0]);

      const res = await queryComment.find();
      console.log('This are the comments: ', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  // Relation Many-to-Many
  const handleCreateSite = async () => {
    const Site = Parse.Object.extend('Site');
    const mySite = new Site();
    mySite.set('title', site);
    try {
      await mySite.save();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleAddSite = async () => {
    const Post = Parse.Object.extend('Post');
    const queryPost = new Parse.Query(Post);
    queryPost.equalTo('author', 'Charles');

    const Site = Parse.Object.extend('Site');
    const querySite = new Parse.Query(Site);
    querySite.equalTo('title', site);

    try {
      const posts = await queryPost.find();
      const sites = await querySite.find();
      posts.forEach((post) => {
        var siteRelation = sites[0].relation('post');
        siteRelation.add(post);
      });

      await sites[0].save();
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='display-3 text-primary mb-3'>
          Objects - Queries - Relations
        </div>
        {/* Objects */}
        <Form>
          <Form.Group>
            <label className='h4 mb-1'>Create a Objects</label>
            <Form.Control
              type='text'
              name='title'
              placeholder='Enter Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='text'
              name='description'
              placeholder='Enter Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='text'
              name='author'
              placeholder='Enter Author'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            ></Form.Control>
            <Form.Control
              type='date'
              name='date'
              placeholder='Enter Date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></Form.Control>
            <br />
            <Button variant='primary' onClick={handleAddPost}>
              Add Post
            </Button>
          </Form.Group>
        </Form>
        {/* Query */}
        <Form className='mt-4'>
          <label className='h4'>Query Objects</label>
          <Form.Group>
            <Form.Control
              type='text'
              name='searchAuthor'
              placeholder='Search by Author'
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='date'
              name='searchDate'
              placeholder='Search by Date'
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant='primary' onClick={handleSearchAuthor}>
            Search by Author
          </Button>
          <Button className='ml-2' variant='primary' onClick={handleSearchDate}>
            Search by Date
          </Button>
        </Form>
        {/* Relations */}
        <Form>
          <label className='h4 mt-4'>One to Many Relation</label>
          <Form.Group>
            <Form.Control
              type='text'
              name='comment'
              placeholder='Add your comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant='primary' onClick={handleAddComment}>
            Add a Comment
          </Button>
          <Button className='ml-2' variant='primary' onClick={handleGetComment}>
            Get a Comments
          </Button>
          <Form.Group>
            <label className='mt-2 h4'>Many to Many Relation</label>
            <Form.Control
              type='text'
              name='site'
              placeholder='Relate to a site'
              value={site}
              onChange={(e) => setSite(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant='primary' className='mr-2' onClick={handleCreateSite}>
            Create Site
          </Button>
          <Button variant='primary' onClick={handleAddSite}>
            Relate to Site
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Objects;
