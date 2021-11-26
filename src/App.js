// router
import { 
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';

// components
import { 
  CreateForm,
  Read,
  UpdateForm
} from './Components';

import './App.css';

function App() {
  return (
    <Router>
      <div className="main">
        <h2 className="main-header">React Crud Operations</h2>
        <div>
          <Routes>
            <Route exact path='/create' element={<CreateForm />} />
            <Route exact path='/read' element={<Read />} />
            <Route path='/update' element={<UpdateForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
