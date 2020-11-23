// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define('HelloWorld', (request) => {
  return 'Hello world!';
});

Parse.Cloud.define('AddEvent', async (req) => {
  const Product = Parse.Object.extend('Events');
  const product = new Product();
  product.set('title', req.params.title);
  product.set('description', req.params.description);

  try {
    const res = product.save();
    return res;
  } catch (error) {
    return error;
  }
});
