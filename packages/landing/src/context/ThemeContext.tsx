import React, { useContext, useEffect, useMemo, useState } from 'react'

import { loadTheme, Theme, themes } from '@devhub/core/src'

export interface ThemeProviderProps {
  children: React.ReactNode
}

export interface ThemeProviderState {
  theme: Theme
  toggleTheme: () => void
}

const defaultLightTheme = themes['light-white']!
const defaultDarkTheme = themes['dark-gray']!
const defaultTheme = getThemefromCache() || loadTheme({ id: 'auto' })

export const ThemeContext = React.createContext<ThemeProviderState>({
  theme: defaultTheme,
  toggleTheme() {
    throw new Error('ThemeContext not yet initialized.')
  },
})
ThemeContext.displayName = 'ThemeContext'

export function ThemeProvider(props: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    saveThemeOnCache(theme)
  }, [theme.id])

  useEffect(() => {
    // workaround for when server returns a different initial theme than client
    // fix the theme switcher button not getting updated
    setTimeout(() => {
      setTheme(t => t)
    }, 10)
  }, [])

  const value: ThemeProviderState = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme(t => (t.isDark ? defaultLightTheme : defaultDarkTheme))
      },
    }),
    [theme.id],
  )

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export const ThemeConsumer = ThemeContext.Consumer
;(ThemeConsumer as any).displayName = 'ThemeConsumer'

export function useTheme() {
  return useContext(ThemeContext)
}

function getThemefromCache() {
  try {
    if (typeof localStorage === 'undefined') return
    const cache = JSON.parse(localStorage.getItem('theme') || '{}')
    if (!(cache && cache.id)) return

    const themeFromCache = loadTheme({ id: cache.id })
    if (
      !(themeFromCache && themeFromCache.id && themeFromCache.backgroundColor)
    )
      return

    return themeFromCache
  } catch (error) {
    console.error(error)
  }
}

function saveThemeOnCache(theme: Theme) {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem('theme', JSON.stringify({ id: theme.id }))
}
