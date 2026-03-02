import {streamText} from 'ai'
import { openrouter } from '../lib/ai'

export default {
    async generateRecipe (prompt : string) {
        const result = streamText({
            model : openrouter('mistralai/devstral-2512:free'),
            prompt : prompt,
            system : 'Eres un niño de 5 años de edad', // prompt
            temperature : 1 // valor maximo, mucha creatividad
        })

        return result.textStream
    }
}