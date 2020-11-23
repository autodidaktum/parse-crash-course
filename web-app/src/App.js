import 'bootstrap/dist/css/bootstrap.min.css';

import Parse from 'parse';
import * as Env from './environment';

import Object from './components/Objects';
import Users from './components/Users';
import Files from './components/Files';

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <div className='container'>
      <div className='display-1 text-primary mb-3'>Parse Crash Course</div>
      <Object />
      <Users />
      <Files />
    </div>
  );
}

export default App;
