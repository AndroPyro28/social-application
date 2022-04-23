import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

function UnProtectedRoutes({Component, isAuth, ...rest}) {
  return <Route
    {...rest}
    render={(props) => {
        if(!isAuth) {
            return <Component/>
        }
        else {
          return <Redirect to='/home' />
        }
    }}
  />;
}

export default UnProtectedRoutes;
