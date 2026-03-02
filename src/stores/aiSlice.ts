import {type StateCreator} from 'zustand'
import AIService from '../services/AIService'

export type AISlice ={
    recipe : string
    generateRecipe : (prompt: string) => Promise<void>
    isGenerating: boolean
}

export const createAISlice : StateCreator<AISlice> = (set) => ({
    recipe: '',

    isGenerating: false,

    generateRecipe : async (prompt) => {
        set({recipe: '', isGenerating: true})
        const data = await AIService.generateRecipe(prompt)
        // genera este for mientras la IA siga generando la respuesta
        for await (const textPart of data) {
            set((state) => ({
                recipe : state.recipe + textPart // escribe en recipe como se vaya generando la info
            }))
        } set({
            isGenerating: false
        })
    }
})