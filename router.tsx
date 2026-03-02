import {lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./src/layout/Layout";
import GenerateAI from './src/views/GenerateAI';
const IndexPage = lazy(() => import('./src/views/IndexPage'))
const FavoritesPage = lazy(() => import('./src/views/FavoritesPage'))

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>

          
            <Route path='/' element={
              <Suspense fallback="Cargando...">
                <IndexPage/>
              </Suspense>
            } index />


            <Route path='/favoritos' element={
              <Suspense fallback="Cargando...">
                <FavoritesPage />
              </Suspense>
            } /> 

            
            <Route path='/generate' element={<GenerateAI />} />

            
          </Route>
        </Routes>
    </BrowserRouter>
  )
}
