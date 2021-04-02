import React from "react";
import Swal from "sweetalert2";

const Usuario = ({ usuario, eliminarUsuario }) => {
	const eliminarEmpleado = (_id) => {
		Swal.fire({
			title: "¿Seguro?",
			text: "Un Producto eliminado no se puede recuperar",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#3f3434",
			confirmButtonText: "Si, Eliminar",
			cancelButtonText: "No, Cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				eliminarUsuario(_id);
			}
		});
	};
	return (
		<div
			className={` border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}
		>
			<div>
				<p className="font-bold text-gray-800">
					Empleado: {usuario.nombre} {usuario.apellido}
				</p>
				<p className="flex items-center my-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-4 h-4 mr-2"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					{usuario.email}
				</p>
			</div>
			<div>
				<button
					// onClick={eliminarPedidoActual}
					className="flex items-center justify-center mt-4 bg-blue-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold w-full"
				>
					Ver Empleado{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-4 h-4 ml-2"
					>
						<path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
						<path
							fillRule="evenodd"
							d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
							clipRule="evenodd"
						/>
					</svg>
				</button>

				<button
					onClick={() => eliminarEmpleado(usuario._id)}
					className="flex items-center justify-center mt-4 bg-red-800 px-5 py-2 inline-block text-white rounded leading-tight uppercase text-xs font-bold w-full text-center"
				>
					Eliminar Empleado{" "}
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

export default Usuario;
