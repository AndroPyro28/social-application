import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import {ContextProvider} from "../components/Context/Call"

function ProtectedRoutes({Component, isAuth, ...rest}) {
  return <Route
    {...rest}
    render={(props) => {
        if (isAuth) {
            return <ContextProvider><Component /></ContextProvider>
            
        }
        else {
          return <Redirect to='/login' />
        }
    }}
  />;
}

export default ProtectedRoutes;
