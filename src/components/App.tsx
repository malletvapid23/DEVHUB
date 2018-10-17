import React, { PureComponent } from 'react'

import { AppNavigator } from '../navigation/AppNavigator'
import { AppGlobalStyles } from './AppGlobalStyles'
import { ColumnsProvider } from './context/ColumnsContext'
import { DimensionsProvider } from './context/DimensionsContext'
import { ThemeProvider } from './context/ThemeContext'
import { UserConsumer, UserProvider } from './context/UserContext'

export class App extends PureComponent {
  render() {
    return (
      <DimensionsProvider>
        <UserProvider>
          <ThemeProvider>
            <UserConsumer>
              {({ user }) => (
                <ColumnsProvider username={(user && user.login) || null}>
                  <>
                    <AppGlobalStyles />
                    <AppNavigator />
                  </>
                </ColumnsProvider>
              )}
            </UserConsumer>
          </ThemeProvider>
        </UserProvider>
      </DimensionsProvider>
    )
  }
}
