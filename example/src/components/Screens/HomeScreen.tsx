import React from 'react'
import { ScreenProps } from 'react-modal-stack-navigator'

import dataList from '../dummyData'
import css from '../Screens/Home.module.css'

const HomeScreen = ({ navigation }: ScreenProps) => {
  const handleLogoClick = (id: number) => {
    navigation.navigate('Profile', { id })
  }

  return (
    <div className={css.container}>
      <div className={css.header}>The FAANG Companies 👩🏻‍💻</div>
      <div className={css.logoList}>
        {dataList.map(({ id, logo }) => {
          return (
            <div
              key={id}
              className={css.logo}
              onClick={() => handleLogoClick(id)}
            >
              <img src={logo} alt='Logo' />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeScreen
