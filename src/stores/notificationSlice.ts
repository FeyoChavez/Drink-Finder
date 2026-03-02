import type {StateCreator} from 'zustand'
import type { FavoriteSliceType } from './favoritesSlice'


type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {
   notification: Notification
   showNotification : (payload: Pick<Notification, 'text' | 'error'>) => void // quiero el text y error de Notification
   hideNotification: () => void
}

export const createNotificationSlice : 
StateCreator<NotificationSliceType & FavoriteSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification : {
    text: '',
    error: false,
    show: false
    },

    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })

        setTimeout(() => {
            get().hideNotification()
        }, 4000);
    },
    hideNotification: () => {
        set({
            notification : {
                text: '',
                error: false,
                show: false
    },
        })
    }
})
