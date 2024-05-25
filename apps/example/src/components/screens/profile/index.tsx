import { useEffect, useState } from "react";
import { ScreenProps } from "react-modal-stack-navigator";

import css from "@components/screens/profile/styles.module.css";
import dataList from "@src/dummyData";

const ProfileScreen = ({
  navigation,
  route,
}: ScreenProps<{
  id: number;
}>) => {
  const [profileInfo, setProfileInfo] = useState<Profile | null>(null);

  useEffect(() => {
    if (!route.params?.id) return;

    const data = dataList.find(({ id }) => id === route.params?.id) || null;
    setProfileInfo(data);
  }, [route.params?.id]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <button
          onClick={handleGoBack}
          className={css.backButton}
          disabled={!navigation.canGoBack()}
        >
          👈🏻
        </button>
        Back
      </div>

      <div className={css.profileHead}>
        <div className={css.coverBg} />
        <div className={css.logo}>
          <img src={profileInfo?.logo} alt="Logo" />
        </div>
      </div>

      <div className={css.profileName}>{profileInfo?.name}</div>

      <p className={css.profileDescription}>{profileInfo?.description}</p>
    </div>
  );
};

export default ProfileScreen;

export interface Profile {
  id: number;
  name: string;
  description: string;
  logo: string;
}
