import React, { useState } from "react";
import { Link } from "react-router-dom";

const useCategoriaFiltro = (categoriasSeleccionadas) => {
	const [categoria, setCategoria] = useState("");

	const FiltroUI = () => {
		return (
			<form className="w-full md:w-2/3 flex items-center">
				<div className="w-1/3 mr-2">
					<Link
						to={"/categorias"}
						className="bg-green-800 p-2 md:w-full inline-block text-white rounded text-xs hover:bg-gray-800 uppercase font-bold text-center"
					>
						Categorias
					</Link>
				</div>
				<div className="w-2/3">
					<select
						className="w-full shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none"
						onChange={(e) => setCategoria(e.target.value)}
						value={categoria}
					>
						<option value="">Todos</option>
						{categoriasSeleccionadas.map((opcion) => (
							<option value={opcion._id} key={opcion._id}>
								{opcion.nombre}
							</option>
						))}
					</select>
				</div>
			</form>
		);
	};

	return {
		FiltroUI,
		categoria,
	};
};

export default useCategoriaFiltro;
