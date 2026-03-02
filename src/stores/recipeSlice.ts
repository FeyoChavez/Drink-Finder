import type { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"
import type { FavoriteSliceType } from "./favoritesSlice"

export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters : SearchFilter) => Promise<void>
    selectRecipe: (id : Drink['idDrink']) => Promise<void>
    closeModal : () => void // coloca el modal como false
}

export const createRecipesSlice : StateCreator<RecipesSliceType & FavoriteSliceType, [], [], RecipesSliceType> // esto para darle de tu slice al de favorites
= (set) => ({
    // valores iniciales de las variables
    categories: { // el schema tiene primero un objeto
        drinks: []
    },
    drinks: { // searchRecipes
        drinks: []
    },

    selectedRecipe: {} as Recipe, // selectRecipe

    modal: false,
    
    // obtiene las categorias del select
    fetchCategories: async() => {
        const categories = await getCategories()
        set({
            categories
        })
    },

    // obtiene las recetas por categoria e ingredientes
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters) // desde RecipeService
        set({
            drinks // escribe en el state al hacer la busqueda
        })
    },

    // obtiene el id de la bebida seleccionada
    selectRecipe: async(id) => {
        const selectedRecipe = await getRecipeById(id)
        set({
            selectedRecipe,
            modal : true
        })
    },

    // cierra el modal 
    closeModal: () => {
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})