import React, {createContext, useContext, useState} from 'react';
import {Text} from 'react-native';
import styles from '~/Utils/styles';
import {ThemeProvider} from 'styled-components';
import GameProvider from './GameContext';
import AuthProvider from './AuthContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export const AppContext = createContext();

export default function AppProvider({children}) {
  const [loading, setLoading] = useState(true);
  return (
    <AppContext.Provider value={{loading, setLoading}}>
      <ThemeProvider theme={styles}>
        <SafeAreaProvider>
          <AuthProvider>
            <GameProvider>{children}</GameProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  return context;
}
