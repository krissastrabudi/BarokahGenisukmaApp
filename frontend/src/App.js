import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

const Login = lazy(() => import('./components/Login'))
const Home = lazy(() => import('./components/Home'))
const MasterSupplier = lazy(() => import('./components/MasterSupplier'))
const MasterCustomer = lazy(() => import('./components/MasterCustomer'))
const MasterBarang = lazy(() => import('./components/MasterBarang'))

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
  return (
    <Suspense fallback="Loading">
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/masterSupplier" component={MasterSupplier} />
          <Route exact path="/masterCustomer" component={MasterCustomer} />
          <Route exact path="/masterBarang" component={MasterBarang} />
        </Switch>
      </React.Fragment>
    </Suspense>
  );
}

export default App;
