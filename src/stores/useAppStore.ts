// Este archivo es el que une a todos los Slice
import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {type RecipesSliceType, createRecipesSlice } from './recipeSlice';
import {type FavoriteSliceType, createFavoritesSlice} from './favoritesSlice'
import { type NotificationSliceType, createNotificationSlice } from './notificationSlice';
import { createAISlice, type AISlice } from './aiSlice';

export const useAppStore = 
create<RecipesSliceType & FavoriteSliceType & NotificationSliceType & AISlice>
()(devtools((...a) => ({
    
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})
))