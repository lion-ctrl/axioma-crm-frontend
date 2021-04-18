import React, { useEffect, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import gastosContext from "../../context/gastos/gastosContext";

import Layout from "../Layout/Layout";
import AsignarCantidades from "./AsignarCantidades";
import AsignarProductos from "./AsignarProductos";

const EditarGasto = ({ history, match }) => {
	// context
	const {
		obtenerGasto,
		gastoseleccionado,
		mensajegasto,
		editarGasto,
		totalgasto
	} = useContext(gastosContext);

	const { id } = match.params;

	useEffect(() => {
		obtenerGasto(id);
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (mensajegasto) {
			if (
				mensajegasto.categoria === "error" ||
				mensajegasto.categoria === "success"
			) {
				history.push("/gastos");
			}
		}
		// eslint-disable-next-line
	}, [mensajegasto]);

	if (!gastoseleccionado) return "cargando...";

	const { _id, nombre, tipo, costo, metodo, productos } = gastoseleccionado;

	const datos = {
		tipo,
		costo,
		nombre,
		metodo,
	};

	const validationSchema = Yup.object({
		tipo: Yup.string().required("Debes seleccionar una opcion"),
		costo: Yup.number()
			.required("El monto del gasto es obligatorio")
			.positive("No puedes ingresar numeros negativos"),
		nombre: Yup.string().required("Debes identificar el gasto"),
		metodo: Yup.string().required("Debes identificar el método de pago"),
	});

	const handleSubmit = (datos) => {
		editarGasto(_id, datos);
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

			<h1 className="text-2xl text-gray-800 font-light">
				Editar Gasto: {nombre}
			</h1>

			<div className="flex justify-center mt-5">
				<Formik
					enableReinitialize
					initialValues={datos}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => {
						return (
							<form
								className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
								onSubmit={props.handleSubmit}
							>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="tipo"
									>
										Tipo de Gasto:
									</label>
									<select
										name="tipo"
										id="tipo"
										className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
										value={props.values.tipo}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									>
										<option value="">-- SELECCIONE --</option>
										<option value="PAGO">PAGO</option>
										<option value="PEDIDO">PEDIDO</option>
									</select>
								</div>
								{props.errors.tipo && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.tipo}
										</p>
									</div>
								)}
								{
									<AsignarProductos
										tipo={props.values.tipo}
										productosAnteriores={productos}
									/>
								}
								{<AsignarCantidades tipo={props.values.tipo} />}
								{props.values.tipo === "PEDIDO" && (
									<div className="flex items-center my-4 justify-between bg-white p-3">
										<h2 className="text-gray-800 text-lg">
											Total a pagar en productos:
										</h2>
										<p className="text-gray-800 mt-0">${totalgasto}</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="costo"
									>
										Monto del gasto:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										name="costo"
										id="costo"
										step="0.1"
										min="0"
										placeholder="costo"
										value={props.values.costo}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.errors.monto && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.monto}
										</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="nombre"
									>
										Nombre del gasto:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="nombre"
										id="nombre"
										placeholder="Nombre del gasto"
										value={props.values.nombre}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.errors.nombre && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.nombre}
										</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="metodo"
									>
										Método de pago:
									</label>
									<select
										name="metodo"
										id="metodo"
										className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
										value={props.values.metodo}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									>
										<option value="">-- SELECCIONE --</option>
										<option value="EFECTIVO">EFECTIVO</option>
										<option value="TARJETA">TARJETA</option>
										<option value="TRANSFERENCIA">TRANSFERENCIA</option>
									</select>
								</div>
								{props.errors.metodo && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
										<p>
											{" "}
											<span className="font-bold">Error:</span>{" "}
											{props.errors.metodo}
										</p>
									</div>
								)}
								<input
									type="submit"
									className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
									value="Editar Gasto"
								/>
							</form>
						);
					}}
				</Formik>
			</div>
		</Layout>
	);
};

export default EditarGasto;
