import type {StateCreator} from 'zustand'
import type { Recipe } from '../types'
import { createRecipesSlice, type RecipesSliceType } from '../stores/recipeSlice';
import { createNotificationSlice, type NotificationSliceType } from './notificationSlice';

export type FavoriteSliceType = {
    favorites: Recipe[]
    handleClickFavorite : (recipe : Recipe) => void
    favoriteExists: (id: Recipe['idDrink']) => boolean
    loadFromStorage : () => void
}

export const createFavoritesSlice : 
StateCreator<FavoriteSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoriteSliceType> = 
 (set, get, api) => ({
    favorites: [],

    // anadir a favoritos
    handleClickFavorite: (recipe) => {
        // si hay un favorito entonces
        if(get().favoriteExists(recipe.idDrink)) { // if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {

           set((state) => ({ // elimina el favorito al dar click
            favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
           }))
           createNotificationSlice(set,get,api).showNotification({
            text: 'Se eliminó de favoritos', 
            error: false
        })

        } else {
            set((state) =>({ // guarda el favorito
                favorites: [...state.favorites, recipe] 
            }))

            createNotificationSlice(set,get,api).showNotification({
            text: 'Se agregó a favoritos', 
            error: false
        })
        }
        createRecipesSlice(set, get, api).closeModal() // esto para obtener las funciones del otro slice
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },

    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },

    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }

})