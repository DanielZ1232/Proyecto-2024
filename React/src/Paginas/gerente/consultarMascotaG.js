import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../components/footer';
import './consultarMascotaG.css';
import NavBarGerente from '../../components/navBarGerente';

const ConsultarMascotG = () => {
  const [mascotas, setMascotas] = useState([]);
  const [razaFiltro, setRazaFiltro] = useState('');
  const [sexoFiltro, setSexoFiltro] = useState('');
  const [edadMinFiltro, setEdadMinFiltro] = useState('');
  const [edadMaxFiltro, setEdadMaxFiltro] = useState('');

  useEffect(() => {
    const obtenerMascotas = async () => {
      try {
        const respuesta = await axios.get('http://localhost:3002/Mascotas/');
        setMascotas(respuesta.data);
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      }
    };

    obtenerMascotas();
  }, []);

  const filtrarMascotas = () => {
    return mascotas.filter((mascota) => {
      const cumpleRaza = razaFiltro ? mascota.Raza.includes(razaFiltro) : true;
      const cumpleSexo = sexoFiltro ? mascota.Sexo === sexoFiltro : true;
      const cumpleEdadMin = edadMinFiltro ? mascota.Edad >= parseInt(edadMinFiltro) : true;
      const cumpleEdadMax = edadMaxFiltro ? mascota.Edad <= parseInt(edadMaxFiltro) : true;

      return cumpleRaza && cumpleSexo && cumpleEdadMin && cumpleEdadMax;
    });
  };

  const verPerfil = (id) => {
    localStorage.setItem('mascotaId', id);
    window.location.href = '/verPerfilMascotaG';
  };

  return (
    <div className="consultarMascotG-body">
      <NavBarGerente />
      <section className="consultarMascotG-container">
        <div className="consultarMascotG-content">
          <h2>Consultar Mascotas</h2>
          <div className="consultarMascotG-filters">
            <input
              type="text"
              placeholder="Filtrar por Raza"
              className="consultarMascotG-filterInput"
              value={razaFiltro}
              onChange={(e) => setRazaFiltro(e.target.value)}
            />
            <select
              className="consultarMascotG-filterInput"
              value={sexoFiltro}
              onChange={(e) => setSexoFiltro(e.target.value)}
            >
              <option value="">Todos los sexos</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
            <input
              type="number"
              placeholder="Edad mínima"
              className="consultarMascotG-filterInput"
              value={edadMinFiltro}
              onChange={(e) => setEdadMinFiltro(e.target.value)}
            />
            <input
              type="number"
              placeholder="Edad máxima"
              className="consultarMascotG-filterInput"
              value={edadMaxFiltro}
              onChange={(e) => setEdadMaxFiltro(e.target.value)}
            />
          </div>
          <div className="consultarMascotG-tableContainer">
            <table className="consultarMascotG-table">
              <thead>
                <tr>
                  <th className="consultarMascotG-th">Nombre</th>
                  <th className="consultarMascotG-th">Raza</th>
                  <th className="consultarMascotG-th">Edad</th>
                  <th className="consultarMascotG-th">Sexo</th>
                  <th className="consultarMascotG-th">Enfermedades</th>
                  <th className="consultarMascotG-th">Peso</th>
                  <th className="consultarMascotG-th">Esterilizado</th>
                  <th className="consultarMascotG-th">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtrarMascotas().map((mascota) => (
                  <tr key={mascota.id}>
                    <td className="consultarMascotG-td">{mascota.Nombre}</td>
                    <td className="consultarMascotG-td">{mascota.Raza}</td>
                    <td className="consultarMascotG-td">{mascota.Edad} años</td>
                    <td className="consultarMascotG-td">{mascota.Sexo}</td>
                    <td className="consultarMascotG-td">{mascota.Enfermedades}</td>
                    <td className="consultarMascotG-td">{mascota.Peso}</td>
                    <td className="consultarMascotG-td">{mascota.Esterilizado ? 'Sí' : 'No'}</td>
                    <td className="consultarMascotG-td">
                      <button
                        className="consultarMascotG-button"
                        onClick={() => verPerfil(mascota.id)}
                      >
                        Perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ConsultarMascotG;
