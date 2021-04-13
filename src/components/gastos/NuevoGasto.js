import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import gastosContext from "../../context/gastos/gastosContext";

import Layout from "../Layout/Layout";
import AsignarProductos from "./AsignarProductos";
import AsignarCantidades from "./AsignarCantidades";

const NuevoGasto = () => {
	// * Context
	const { nuevoGasto, limpiarNuevoGastosProductos } = useContext(gastosContext);

	const formik = useFormik({
		initialValues: {
			tipo: "",
			costo: 0,
			nombre: "",
			pago: "",
		},
		validationSchema: Yup.object({
			tipo: Yup.string().required("Debes seleccionar una opcion"),
			costo: Yup.number()
				.required("El monto del gasto es obligatorio")
				.positive("No puedes ingresar numeros negativos"),
			nombre: Yup.string().required("Debes identificar el gasto"),
			pago: Yup.string().required("Debes identificar el tipo de pago"),
		}),
		onSubmit: (datos) => {
			nuevoGasto(datos);
		},
	});

	useEffect(() => {
		if (formik.values.tipo) {
			limpiarNuevoGastosProductos(formik.values.tipo);
		}
		// eslint-disable-next-line
	}, [formik.values.tipo]);

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Gasto</h1>

			<div className="flex justify-center mt-5">
				<form
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
					onSubmit={formik.handleSubmit}
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
							value={formik.values.tipo}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value="">-- SELECCIONE --</option>
							<option value="PAGO">PAGO</option>
							<option value="PEDIDO">PEDIDO</option>
						</select>
					</div>
					{formik.errors.tipo && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.tipo}
							</p>
						</div>
					)}
					{ <AsignarProductos tipo={formik.values.tipo} />}
					{formik.values.tipo === "PEDIDO" && <AsignarCantidades />}
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
							value={formik.values.costo}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.monto && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.monto}
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
							value={formik.values.nombre}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.nombre && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.nombre}
							</p>
						</div>
					)}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="pago"
						>
							Método de pago:
						</label>
						<select
							name="pago"
							id="pago"
							className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
							value={formik.values.pago}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value="">-- SELECCIONE --</option>
							<option value="EFECTIVO">EFECTIVO</option>
							<option value="TARJETA">TARJETA</option>
							<option value="TRANSFERENCIA">TRANSFERENCIA</option>
						</select>
					</div>
					{formik.errors.pago && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.pago}
							</p>
						</div>
					)}
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Nuevo Gasto"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default NuevoGasto;
