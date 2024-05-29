// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import customTheme from '../src'
import './style.css'
export default {
  ...DefaultTheme,
  ...customTheme,
}
