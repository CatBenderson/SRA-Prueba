import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Route, Routes } from "react-router-dom";

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
  <HashRouter>
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flex: 1, marginLeft: '1vw' }}>
        <Routes>
          <Route path='/' element={<Principal />} />
          <Route path='/recursos' element={<Recursos />} />
          <Route path='/programacion' element={<InfoExperiencia />} />
          <Route path='/programacion/1' element={<Unidad />} />
          <Route path='/programacion/:id' element={<Unidad />} />
          <Route path='/missing' element={<Missing />} />
          <Route path='/prueba' element={<CodigoSeleccion archivo={codigoPorUnidad[1]} />}/>
        </Routes>
      </div>
    </div>
  </HashRouter>
);


reportWebVitals();
