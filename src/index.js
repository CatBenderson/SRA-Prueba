import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideBar from './Componentes/SideBar';
import Principal from './Componentes/Principal';
import Missing from './Componentes/Missing';
import InfoExperiencia from './Componentes/InfoExperiencia';
import Unidad from './Componentes/Unidad';
import CodigoSeleccion from './Componentes/CodigoSeleccion';
import { codigoPorUnidad } from './Utils/Archivos';
import Recursos from './Componentes/InfoRecursos';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, marginLeft: '1vw' }}>
        <Routes>
          <Route exact path='/' element={<Principal />} />
          <Route exact path='/recursos' element={<Recursos />} />
          <Route exact path='/programacion' element={<InfoExperiencia />} />
          <Route exact path='/programacion/1' element={<Unidad />} />
          <Route exact path='/programacion/:id' element={<Unidad />} />
          <Route exact path='/missing' element={<Missing />} />
          <Route exact path='/prueba' element={<CodigoSeleccion archivo={codigoPorUnidad[1]} />}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
);

reportWebVitals();
