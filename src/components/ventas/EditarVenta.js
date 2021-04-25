import React, { useEffect, useContext } from "react";
import {Redirect} from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import ventasContext from "../../context/ventas/ventasContext";
import authContext from "../../context/autenticacion/authContext";

import Layout from "../Layout/Layout";
import AsignarProductos from "./AsignarProductos";
import AsignarCantidades from "./AsignarCantidades";

const EditarVenta = ({ match, history }) => {
	const { id } = match.params;
	// context
	const { obtenerVenta, mensajeventa, ventaseleccionada, totalventa, EditarVenta } = useContext(
		ventasContext
	);
	const { usuario } = useContext(authContext);

	useEffect(() => {
		if (id) {
			obtenerVenta(id);
		}
		// eslint-disable-next-line
	}, [id]);

	useEffect(() => {
		if (mensajeventa) {
			if (mensajeventa.categoria === "error" || mensajeventa.categoria === "success") {
				history.push("/ventas");
			}
		}
		// eslint-disable-next-line
	}, [mensajeventa]);

	if (!ventaseleccionada) return "cargando...";
	if (!usuario) return null;

	const { nombre, metodo, productos, _id, usuario:user } = ventaseleccionada;

	if (usuario.rol !== "ADMIN") {
		if (usuario._id !== user._id) {
			return <Redirect to="/ventas"/>
		}
	}

	const initialValues = {
		nombre,
		metodo,
	};

	const validationSchema = Yup.object({
		nombre: Yup.string().required("Debes identificar la venta"),
		metodo: Yup.string().required("Debes identificar el método de pago"),
	});

	const handleSubmit = (datos) => {
        datos.total = totalventa;
		EditarVenta(_id,datos);
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
				Editar Venta: {nombre}
			</h1>

			<div className="flex justify-center mt-5">
				<Formik
					enableReinitialize
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => {
						return (
							<form
								className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
								onSubmit={props.handleSubmit}
							>
								<AsignarProductos productosAnteriores={productos} />
								<AsignarCantidades />

								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="costo"
									>
										Monto total de la venta:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										name="costo"
										id="costo"
										step="0.1"
										min="0"
										readOnly
										placeholder="costo"
										value={totalventa}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="nombre"
									>
										concepto:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="nombre"
										id="nombre"
										placeholder="Concepto de la venta"
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
									value="Editar Venta"
								/>
							</form>
						);
					}}
				</Formik>
			</div>
		</Layout>
	);
};

export default EditarVenta;
