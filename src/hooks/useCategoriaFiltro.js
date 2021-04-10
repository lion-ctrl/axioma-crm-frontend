import React, { useState } from "react";

const useCategoriaFiltro = (categoriasSeleccionadas) => {
	const [categoria, setCategoria] = useState("");

	const FiltroUI = () => {
		return (
			<form className="w-full md:w-2/3">
				<div>
					<select
						className="w-full shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none md:mr-5"
						onChange={(e) => setCategoria(e.target.value)}
						value={categoria}
					>
						<option value="">-- Filtra por categoria --</option>
						{categoriasSeleccionadas.map((opcion, index) => (
							<option value={opcion} key={index}>
								{opcion}
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
