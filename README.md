# react-modal-stack-navigator

> react-modal-stack-navigator component

[![NPM](https://img.shields.io/npm/v/react-modal-stack-navigator.svg)](https://www.npmjs.com/package/react-modal-stack-navigator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-modal-stack-navigator
```

## Usage

```tsx
import React from 'react'
import StackNavigator from 'react-modal-stack-navigator'

import UseYourFavoriteModal from './components/Modal'
import HomeScreen from './components/Screens/HomeScreen'
import ProfileScreen from './components/Screens/ProfileScreen'

const screens = [
  { name: 'Home', component: HomeScreen },
  { name: 'Profile', component: ProfileScreen }
]

const App = () => {
  return (
    <div>
      <UseYourFavoriteModal open={true}>
        <StackNavigator screens={screens} />
      </UseYourFavoriteModal>
    </div>
  )
}

export default App

```

## License

MIT © [AroshAkalanka](https://github.com/AroshAkalanka)
