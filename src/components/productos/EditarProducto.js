import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";

const EditarProducto = ({ history, match }) => {
	// Context
	const {
		buscarProducto,
		mensajeproducto,
		productoseleccionado,
		actualizarProducto,
	} = useContext(productosContext);

	// slug
	const { slug } = match.params;

	// Routing
	useEffect(() => {
		if (mensajeproducto) {
			if (mensajeproducto.categoria === "error") {
				Swal.fire("Error", mensajeproducto.msg, mensajeproducto.categoria);
			} else {
				Swal.fire("Correcto", mensajeproducto.msg, mensajeproducto.categoria);
				setTimeout(() => {
					history.push("/productos");
				}, 1000);
			}
		}
		if (slug) {
			buscarProducto(slug);
		}
		// eslint-disable-next-line
	}, [mensajeproducto, slug]);

	// Imagen
	const [imagen, setImagen] = useState([]);
	const [errorimagen, setErrorImagen] = useState(false);

	const leerImagen = (e) => {
		if (e.target.files[0]) {
			const tipo = e.target.files[0].type;
			if (
				tipo === "image/jpg" ||
				tipo === "image/png" ||
				tipo === "image/jpeg" ||
				tipo === "image/gif"
			) {
				setErrorImagen(false);
				setImagen(e.target.files);
			} else {
				setErrorImagen(true);
			}
		} else {
			setImagen([]);
		}
	};

	if (!productoseleccionado) return "Cargando...";

	const {
		_id,
		nombre,
		precioCosto,
		precioVenta,
		cantidad,
		metodoContable,
		categoria,
		imagen: imagenProducto,
	} = productoseleccionado;

	const datos = {
		nombre,
		costo: precioCosto,
		venta: precioVenta,
		cantidad,
		metodoContable,
		categoria,
	};

	const validationSchema = Yup.object({
		nombre: Yup.string().required("El nombre es obligatorio"),
		costo: Yup.number()
			.required("Debes ingresar al menos 0 para registrar el producto")
			.min(0, "No puedes ingresar numeros negativos"),
		venta: Yup.number()
			.required("Debes ingresar al menos 0 para registrar el producto")
			.min(0, "No puedes ingresar numeros negativos"),
		cantidad: Yup.number()
			.required("Debes ingresar al menos 0 para registrar el producto")
			.min(0, "No puedes ingresar numeros negativos"),
		metodoContable: Yup.string().required(
			"Ingrese como se lleva el control del producto"
		),
		categoria: Yup.string("No puedes ingresar numeros"),
	});

	const handleSubmit = (datos) => {
		const formData = new FormData();
			formData.append("nombre", datos.nombre);
			formData.append("precioCosto", datos.costo);
			formData.append("precioVenta", datos.venta);
			formData.append("cantidad", datos.cantidad);
			formData.append("metodoContable", datos.metodoContable);
			formData.append("categoria", datos.categoria);
			if (imagen.length) {
				formData.append("imagen", imagen[0]);
			}
		actualizarProducto(formData,_id);
	};

	return (
		<Layout>
			<h1 className="text-2xl text-gray-800 font-light">
				Editar Producto: {nombre}
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
										htmlFor="nombre"
									>
										Nombre
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="nombre"
										id="nombre"
										placeholder="Nombre"
										value={props.values.nombre}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								{props.errors.nombre && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{props.errors.nombre}</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="costo"
									>
										Precio de costo:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										name="costo"
										id="costo"
										step="0.1"
										min="0"
										placeholder="Costo"
										value={props.values.costo}
										onChange={props.handleChange}
									/>
								</div>
								{props.errors.costo && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{props.errors.costo}</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="venta"
									>
										Precio de venta:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										name="venta"
										id="venta"
										placeholder="Venta"
										step="0.1"
										value={props.values.venta}
										onChange={props.handleChange}
									/>
								</div>
								{props.errors.venta && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{props.errors.venta}</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="cantidad"
									>
										Cantidad:
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="number"
										name="cantidad"
										id="cantidad"
										step={
											props.values.metodoContable === "CONTABLE" ||
											props.values.metodoContable === ""
												? ""
												: "0.1"
										}
										placeholder="Cantidad"
										value={props.values.cantidad}
										onChange={props.handleChange}
									/>
								</div>
								{props.errors.cantidad && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{props.errors.cantidad}</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="metodoContable"
									>
										Metodo Contable:
									</label>
									<select
										name="metodoContable"
										id="metodoContable"
										className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
										value={props.values.metodoContable}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									>
										<option value="">-- SELECCIONE --</option>
										<option value="CONTABLE">CONTABLE</option>
										<option value="PESO">PESO</option>
										<option value="LIQUIDO">LIQUIDO</option>
									</select>
								</div>
								{props.errors.metodoContable && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{props.errors.metodoContable}</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="imagen"
									>
										Imagen:
									</label>
									<input
										type="file"
										name="imagen"
										id="imagen"
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										onChange={leerImagen}
									/>
								</div>
								{imagenProducto && (
									<div className="mb-4">
										<p className="text-gray-700 text-sm font-bold mb-2">
											Imagen Anterior:{" "}
										</p>
										<img
											src={`${process.env.REACT_APP_BACKEND_URL}/uploads/productos/${imagenProducto}`}
											alt="imagen producto"
											className="h-60 w-full object-cover"
										/>
									</div>
								)}
								{errorimagen && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>Solo puedes subir imagenes</p>
									</div>
								)}
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="categoria"
									>
										Categoria:
									</label>
									<select
										name="categoria"
										id="categoria"
										className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
										value={props.values.categoria}
										onChange={props.handleChange}
									>
										<option value="">-- SELECCIONE --</option>
										<option value="HOGAR">HOGAR</option>
										<option value="GOLOSINAS">GOLOSINAS</option>
										<option value="PERSONALES">PERSONALES</option>
									</select>
								</div>
								{props.errors.categoria && (
									<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
										<p className="font-bold">Error</p>
										<p>{props.errors.categoria}</p>
									</div>
								)}
								<input
									type="submit"
									className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
									value="Actualizar Producto"
								/>
							</form>
						);
					}}
				</Formik>
			</div>
		</Layout>
	);
};

export default EditarProducto;
