import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Welcome from './components/pages/Welcome';
import Products from './components/pages/Products';
import MainHeader from './components/MainHeader';
import ProductDetail from './components/pages/ProductDetail';

function App() {
  return (
    <Fragment>
      <MainHeader />
      <main>
        <div>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/Welcome' />
            </Route>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/products" exact>
              <Products />
            </Route>
            <Route path="/products/:productId" exact>
              <ProductDetail />
            </Route>
          </Switch>

        </div>
      </main>
    </Fragment>



  );
}

export default App;
