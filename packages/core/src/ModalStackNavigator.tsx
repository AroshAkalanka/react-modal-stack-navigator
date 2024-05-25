import { AnimatePresence, motion } from "framer-motion";
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
    currentScreen: Route;
  }>;
}

const StackNavigator = <T extends Screen<any>>({
  screens,
  layout: CustomLayout,
}: StackNavigatorProps<T>): ReactElement => {
  const [screenStack, setScreenStack] = useState<Route[]>([
    { name: screens[0]?.name || "", params: {} },
  ]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const navigation: Navigation = {
    navigate: (screenName: string, screenParams?: any) => {
      setDirection("forward");
      setScreenStack(prevStack => [
        ...prevStack,
        { name: screenName, params: screenParams || {} },
      ]);
    },
    replace: (screenName: string, screenParams?: any) => {
      setDirection("forward");
      setScreenStack(prevStack => [
        ...prevStack.slice(0, -1),
        { name: screenName, params: screenParams || {} },
      ]);
    },
    goBack: () => {
      setDirection("backward");
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

  const forwardAnimation = {
    initial: { opacity: 0.2, x: -8 },
    animate: { opacity: 1, x: 0 },
  };
  const backwardAnimation = {
    initial: { opacity: 0.2, x: 8 },
    animate: { opacity: 1, x: 0 },
  };
  const animationVariants =
    direction === "forward" ? forwardAnimation : backwardAnimation;

  const children = React.createElement(screenComponent.component, {
    navigation,
    route: currentScreen,
  });
  const animatedChildren = (
    <motion.div
      initial="initial"
      animate="animate"
      key={currentScreen.name}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );

  if (CustomLayout) {
    return (
      <CustomLayout currentScreen={currentScreen} navigation={navigation}>
        <AnimatePresence mode="wait">{animatedChildren}</AnimatePresence>
      </CustomLayout>
    );
  }

  return <AnimatePresence mode="wait">{animatedChildren}</AnimatePresence>;
};

export default StackNavigator;
export type { ScreenProps };
