import React, { useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {NavController} from '@/components/nav';
import NativeSharedWindow from '@/components/native-shared-window';
import { DeviceDetectController } from '../device-detect';
import { AutoplayToast } from '@/components/autoplay-toast';
import { useRoomStore, useUIStore, useAppStore } from '@/hooks';
import { Loading } from '@/components/loading';
import { observer } from 'mobx-react';
import { t } from '@/i18n';

import './room.scss';
import { BizLogger } from '@/utils/biz-logger';
import { SmallClass } from './small-class';
import { OneToOne } from './one-to-one';
import { BigClass } from './big-class';

export const roomTypes = [
  {value: 0, path: 'one-to-one'},
  {value: 1, path: 'small-class'},
  {value: 2, path: 'big-class'},
  {value: 3, path: 'breakout-class'},
  {value: 4, path: 'middle-class'},
];

function getIpc() {
  return window.ipc
}

const RoomController = observer(({children}: any) => {
  // useEffect(() => {
  //   const ipc = getIpc()
  //   if (ipc && ipc.send) {
  //     ipc.send('resize-window', {width: 990, height: 706});
  //   }
  //   return () => {
  //     const ipc = getIpc()
  //     if (ipc && ipc.send) {
  //       ipc.send('resize-window', {width: 700, height: 500});
  //     }
  //   }
  // }, [getIpc])

  const uiStore = useUIStore()

  const location = useLocation()

  const roomStore = useRoomStore()

  const appStore = useAppStore()

  const history = useHistory()

  useEffect(() => {
    // 观众时userRole为0,这里只能做非空判断
    if (appStore.userRole < 0) {
      uiStore.unblock()
      history.push('/')
      return
    }

    roomStore.join().then(() => {
      uiStore.addToast(t('toast.successfully_joined_the_room'))
    }).catch((err) => {
      BizLogger.warn(err.message)
      uiStore.addToast(t('toast.failed_to_join_the_room') + `${JSON.stringify(err.message)}`)
    })
  }, [])
  
  let pathList = location.pathname.split('/')
  let path = pathList[pathList.length - 1]
  const index = roomTypes.findIndex((it: any) => path === it.path)

  const value = roomTypes[index].path
  
  return (
    <div className={`classroom ${value}`}>
      {uiStore.loading ? <Loading /> : null}
      <AutoplayToast />
      <DeviceDetectController />
      <NativeSharedWindow />
      <NavController />
      {children}
    </div>
  );
})

const RoomPage = observer(({ children }: any) =>{
  return (
    <RoomController>
      {children}
    </RoomController>
  )
})

export const OneToOneRoomPage = () => (
  <RoomPage>
    <OneToOne />
  </RoomPage>
)

export const SmallClassPage = () => (
  <RoomPage>
    <SmallClass />
  </RoomPage>
)

export const BigClassPage = () => (
  <RoomPage>
    <BigClass />
  </RoomPage>
)