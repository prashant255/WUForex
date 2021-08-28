import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeMain from './components/home/home-main/Home-main';
import  Home  from './components/home/Home';
import Analytics from './components/analytics/Analytics';
import About from './components/about/About';
import CurrencyPairError from './components/modal/currencyPairError/CurrencyPairError';
import PageNotFound from './components/404Page/404Page'
import  Footer from './components/common/footer/Footer';

function App() {
  return (
    <div className = "App">
      <BrowserRouter>
          <div>
            <Switch>
              <Route path = "/" component = {Home} exact={true}/>
              <Route path = "/home" component = {Home} exact={true}/>
              <Route path = "/home/main" component = {HomeMain}/>
              <Route path =  "/analytics" component = {Analytics}/>
              <Route path = "/about" component = {About} /> 
              <Route path = '/currencyPairError' component = {CurrencyPairError} />
              <Route component={PageNotFound}/>
            </Switch>
          </div>
         <Footer className="footer"/>
      </BrowserRouter>
    </div>
  );
}

export default App;
