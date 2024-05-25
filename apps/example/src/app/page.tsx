"use client";
import StackNavigator from "react-modal-stack-navigator";

import UseYourFavoriteModal from "@components/modal";
import HomeScreen from "@components/screens/home";
import ProfileScreen from "@components/screens/profile";

const screens = [
  { name: "Home", component: HomeScreen },
  { name: "Profile", component: ProfileScreen },
];

export default function Page() {
  return (
    <main>
      <h1 style={{ textAlign: "center" }}>React Modal Stack Navigator</h1>

      <UseYourFavoriteModal open={true}>
        <StackNavigator screens={screens} />
      </UseYourFavoriteModal>
    </main>
  );
}
