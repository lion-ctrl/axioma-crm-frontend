import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import usuariosContext from "../../context/usuarios/usuariosContext";

import Layout from "../Layout/Layout";
import RutaAdministrador from "../rutas/RutaAdministrador";

const EditarUsuario = ({history}) => {
	const { usuarioseleccionado, editarEmpleadoPut, mensajeusuario } = useContext(usuariosContext);
    const [datos,setDatos] = useState(usuarioseleccionado);

    useEffect(() => {
        if (mensajeusuario) {
            if (mensajeusuario.categoria === "success") {
                history.push("/usuarios");
            }
        }
    }, [mensajeusuario])

	if (!usuarioseleccionado) return <Redirect to="/usuarios" />;

    const handleChange = (e) => {
        setDatos({
            ...datos,
            rol:e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editarEmpleadoPut(datos)
    }

	return (
		<Layout>
			<RutaAdministrador />
			<form 
                className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mt-10 mx-auto"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="rol"
                    >
                        Rol de Usuario
                    </label>
                    <select
                        name="rol"
                        id="rol"
                        className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
                        value={datos.rol}
						onChange={handleChange}
                    >
                        <option value="EMPLEADO">EMPLEADO</option>
                        <option value="ADMIN">ADMINISTRADOR</option>
                    </select>
                </div>
                <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                    value="Editar Usuario"
                />
			</form>
		</Layout>
	);
};

export default EditarUsuario;
