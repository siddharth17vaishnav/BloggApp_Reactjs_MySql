import Home from './components/Home';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Details from './components/Details';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Profile from './components/Profile';
import CreatePost from './components/CreateaPost';
import ContactUs from './components/ContactUs';
import Dashboard from './Dashboard/main';
import Users_Dashboard from './Dashboard/users';


function App() {
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Index} exact/>
          <Route path="/home" component={Home} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/post/:id" component={Details} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/createPost" component={CreatePost} exact />
          <Route path="/contactus" component={ContactUs} exact />

          #Admin Dashboard
          <Route path="/user/admin/dashboard" component={Dashboard} exact/>
          <Route path="/user/admin/dashboard/users" component={Users_Dashboard} exact/>
        </Switch>
        </Router>
    </div>
  );
}

export default App;
