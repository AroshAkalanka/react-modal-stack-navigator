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
