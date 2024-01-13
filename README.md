# react-modal-stack-navigator

> react-modal-stack-navigator component

[![NPM](https://img.shields.io/npm/v/react-modal-stack-navigator.svg)](https://www.npmjs.com/package/react-modal-stack-navigator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-modal-stack-navigator
```

or

```bash
yarn add react-modal-stack-navigator
```

## Usage

### Setup

Import the `StackNavigator` component in your app. and wrap it inside your favorite modal component. StackNavigator will provide the navigation capabilities and take care of rendering the screens.

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

You can provide all your screens to the StackNavigator via the `screens Prop`.
It accepts an array of objects, and you need to provide a unique name for your route and the screen component you want to render.

The first object in the array will be used as the `initial route`.

### Navigation

Now that the setup is complete, let's explore how to navigate between screens.

Your screen components, such as **HomeScreen** and **ProfileScreen**, now **receive** the `ScreenProps`. These props provide essential navigation functionalities to those components.

Here's an example using **HomeScreen.tsx**:

```tsx
import React from 'react'
import { ScreenProps } from 'react-modal-stack-navigator'

const HomeScreen = ({ navigation }: ScreenProps) => {

  const handleNavigation = () => {
    navigation.navigate('Profile', {
      userId: 1234
    })
  }

  return (
    <div>
      <h1>Instagram Home Screen</h1>

      <button onClick={handleNavigation}>View John's Profile</button>
    </div>
  )
}

```

Now, let's take a look at **ProfileScreen.tsx**:

```tsx
import React from 'react'
import { ScreenProps } from 'react-modal-stack-navigator'

const ProfileScreen = ({ navigation, route }: ScreenProps<{ userId: number }>) => {
  // Access userId from the route.params
  const userId = route.params?.userId || null;

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <div>
      <h1>Instagram Profile Screen</h1>

      {userId && (
        <p>Viewing Profile for User ID: {userId}</p>
      )}

      <div>
        <button
          onClick={handleGoBack}
          disabled={!navigation.canGoBack()}
        >
          Go back to the home page
        </button>
      </div>

    </div>
  )
}
```

### ScreenProps

The `ScreenProps` interface provides two main objects: `navigation` and `route`, offering essential functionalities for screen components.

#### 1. Navigation Object
The `navigation` object allows screen components to perform navigation actions.

- **`navigation.navigate(screenName: string, params?: Record<string, any>): void`**: Navigate to a specified screen with optional parameters. For example:

  ```tsx
  const handleNavigation = () => {
    navigation.navigate('Profile', {
      userId: 1234
    });
  }
  ```

- **`navigation.replace(screenName: string, params?: Record<string, any>): void`**: Replace the current screen with a new screen, also with optional parameters.

- **`navigation.canGoBack(): boolean`**: Check if there's a screen to go back to.

- **`navigation.goBack(): void`**: Navigate back to the previous screen in the stack.


#### 2. Route Object
The route object contains information about the route, including parameters.

- **`route.params: Record<string, any>`**: An object containing the parameters passed to the current route. For example:

  ```tsx
  const userId = route.params?.userId || null;
  ```

- **`route.name: string`**: Represents the name (you provided previously) of the current route.


These `ScreenProps` allow your screen components to seamlessly integrate with the navigation stack, providing a smooth user experience.

## Additional Configuration

Apart from the `screens` prop, the `<StackNavigator />` component also accepts a `layout` prop. The `layout` prop allows you to provide a custom wrapper around the navigator's screens.

```tsx
<StackNavigator
  screens={screens}
  layout={({ navigation, children }) => {
    return <div>{children}</div>
  }}
/>
```

## Example

See the `react-modal-stack-navigator` in action by checking out our [examples directory](https://github.com/AroshAkalanka/react-modal-stack-navigator/tree/main/example). Run the example locally to see the component's functionality. 🚀


## License

MIT © [AroshAkalanka](https://github.com/AroshAkalanka)
