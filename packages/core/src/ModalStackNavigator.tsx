import React, { ReactElement, useState } from "react";

interface ScreenProps<Params = {}> {
  navigation: Navigation;
  route: Route<Params>;
}

interface Screen<Params> {
  name: string;
  component: React.ComponentType<ScreenProps<Params>>;
}

interface Navigation {
  navigate: (screenName: string, params?: Record<string, any>) => void;
  replace: (screenName: string, params?: Record<string, any>) => void;
  canGoBack: () => boolean;
  goBack: () => void;
}

interface Route<Params = Record<string, any>> {
  name: string;
  params?: Params;
}

interface StackNavigatorProps<T extends Screen<any>> {
  screens: T[];
  layout?: React.FC<{
    navigation: Navigation;
    children: React.ReactNode;
  }>;
}

const StackNavigator = <T extends Screen<any>>({
  screens,
  layout: CustomLayout,
}: StackNavigatorProps<T>): ReactElement => {
  const [screenStack, setScreenStack] = useState<Route[]>([
    { name: screens[0]?.name || "", params: {} },
  ]);

  const navigation: Navigation = {
    navigate: (screenName: string, screenParams?: any) => {
      setScreenStack(prevStack => [
        ...prevStack,
        { name: screenName, params: screenParams || {} },
      ]);
    },
    replace: (screenName: string, screenParams?: any) => {
      setScreenStack(prevStack => [
        ...prevStack.slice(0, -1),
        { name: screenName, params: screenParams || {} },
      ]);
    },
    goBack: () => {
      if (screenStack?.length > 1) {
        setScreenStack(prevStack => {
          const updatedStack = [...prevStack];
          updatedStack.pop();
          return updatedStack;
        });
      }
    },
    canGoBack: () => screenStack.length > 1,
  };

  const currentScreen = screenStack[screenStack?.length - 1];

  const screenComponent = screens.find(
    screen => screen.name === currentScreen.name
  );

  if (!screenComponent) {
    const errorMessage = "Screen not found";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  if (CustomLayout) {
    return (
      <CustomLayout navigation={navigation}>
        {React.createElement(screenComponent.component, {
          navigation,
          route: currentScreen,
        })}
      </CustomLayout>
    );
  }

  return React.createElement(screenComponent.component, {
    navigation,
    route: currentScreen,
  });
};

export default StackNavigator;
export type { ScreenProps };
