import React, { useEffect, useContext, useState } from "react";
import {Redirect} from "react-router-dom";

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";

const EditarCategoria = ({ history }) => {
	const { mensajeproducto, categoriaseleccionada, editarCategoria } = useContext(productosContext);

    const [categoria, setCategoria] = useState({
        nombre: ""
    });
	const [error, setError] = useState(false);

	useEffect(() => {
		if (mensajeproducto) {
			if (mensajeproducto.categoria === "success") {
				history.push("/categorias");
			}
		}
        if (categoriaseleccionada) {
            setCategoria(categoriaseleccionada);
        }
		// eslint-disable-next-line
	}, [mensajeproducto]);

    if (!categoriaseleccionada) return <Redirect to="/categorias" />;

	const handleChange = (e) => {
		setCategoria({
            ...categoria,
            nombre:e.target.value
        });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (categoria.nombre.trim() === "") {
			setError(true);
			return;
		}
		setError(false);
		editarCategoria(categoria);
	};

	return (
		<Layout>
			<button
				type="button"
				className="mt-4 bg-blue-800 px-5 py-2 block text-white rounded leading-tight uppercase text-xs font-bold text-center mb-10 w-full md:w-auto"
				onClick={() => history.goBack()}
			>
				Regresar
			</button>
			<h1 className="text-2xl text-gray-800 font-light">Editar Categoria</h1>

			<div className="flex justify-center mt-5">
				<form
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
					onSubmit={handleSubmit}
				>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="nombre"
						>
							Nombre
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="text"
							name="nombre"
							id="nombre"
							placeholder="Nombre (Obligatorio)"
							value={categoria.nombre}
							onChange={handleChange}
						/>
					</div>
					{error && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>El Nombre es obligatorio</p>
						</div>
					)}
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Editar Categoria"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default EditarCategoria;
