import React,{ useContext } from "react";
import { Link } from "react-router-dom";

import productosContext from "../../context/productos/productosContext";

const Categoria = ({ categoria }) => {
    const { eliminarCategoria, obtenerCategoria } = useContext(productosContext);
    const eliminarCategoriaClick = (_id) => {
        eliminarCategoria(_id);
    }
    const editarCategoria = (categoria) => {
        obtenerCategoria(categoria);
    }

	return (
		<div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
			<div>
				<p className="font-bold text-gray-800">{categoria.nombre}</p>
			</div>
			<div>
				<Link
					to={`/categoria/editar/${categoria._id}`}
					className="flex items-center justify-center mt-4 bg-green-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold w-full"
                    onClick={() => editarCategoria(categoria)}
				>
					Editar Categoria{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
						// eslint-disable-next-line
						className="w-4 h-4 ml-2"
					>
						<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
					</svg>
				</Link>

				<button
					onClick={() => eliminarCategoriaClick(categoria._id)}
					className="flex items-center justify-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold w-full text-center"
				>
					Eliminar Categoria{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-4 h-4 ml-2"
					>
						<path
							fillRule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clipRule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default Categoria;
