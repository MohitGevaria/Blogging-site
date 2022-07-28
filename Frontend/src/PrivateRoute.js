import * as React from 'react'
import { Route, Redirect, RouteComponentProps, Navigate } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

// interface PrivateRouteParams extends RouteProps {
//   component:
//     | React.ComponentType<RouteComponentProps<any>>
//     | React.ComponentType<any>
// }

export default function PrivateRoute({
  component: Component,
  ...rest
}) {
  const { keycloak } = useKeycloak()

  return (
    <Route
      {...rest}
      render={(props) =>
        keycloak?.authenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}