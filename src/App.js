import { Switch, Route } from 'react-router-dom';
import Register from '../src/features/Register/Register';
import LoginForm from '../src/features/Auth/components/userAuth/LoginForm';
import Main from './features/Main/main';
import ProductDetail from './features/ProductDetail/ProductDetail';
import Productlist from './features/ProductList/ProductList';
import ScrollToTop from './constants/ScrollToTop';
import Profile from './features/Profile/Profile';

function App() {
  return (
    <Switch>
      <ScrollToTop>
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" exact component={Register} />
        <Route path="/account" exact component={Profile} />
        <Route exact path="/productDetail/:id" component={ProductDetail} />
        <Route path="/productList/:id" component={Productlist} />
        <Route path="/" exact component={Main} />
      </ScrollToTop>
    </Switch>
  );
}

export default App;
