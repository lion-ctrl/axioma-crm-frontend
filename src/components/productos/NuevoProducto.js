import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import productosContext from "../../context/productos/productosContext";

import Layout from "../Layout/Layout";
import RutaAdminstrador from "../rutas/RutaAdministrador";

const NuevoProducto = ({ history }) => {
	// Context
	const { nuevoProducto, mensajeproducto } = useContext(productosContext);

	// Routing
	useEffect(() => {
        if (mensajeproducto) {
            if (mensajeproducto.categoria === "success") {
				history.push("/productos");
            }
        }
        // eslint-disable-next-line
	}, [mensajeproducto]);

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

	// Validacion
	const formik = useFormik({
		initialValues: {
			nombre: "",
			costo: 0,
			venta: 0,
			cantidad: 0,
			categoria: "",
		},
		validationSchema: Yup.object({
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
			categoria: Yup.string("No puedes ingresar numeros"),
		}),
		onSubmit: (datos) => {
			const formData = new FormData();
			formData.append("nombre", datos.nombre);
			formData.append("precioCosto", datos.costo);
			formData.append("precioVenta", datos.venta);
			formData.append("cantidad", datos.cantidad);
			formData.append("categoria", datos.categoria);
			if (imagen.length) {
				formData.append("imagen", imagen[0]);
			}
			nuevoProducto(formData);
		},
	});
	return (
		<Layout>
			<RutaAdminstrador/>
			<button
				type="button"
				className="mt-4 bg-blue-800 px-5 py-2 block text-white rounded leading-tight uppercase text-xs font-bold text-center mb-10 w-full md:w-auto"
				onClick={() => history.goBack()}
			>
				Regresar
			</button>
			<h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>
			<div className="flex justify-center mt-5">
				<form
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
					onSubmit={formik.handleSubmit}
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
							value={formik.values.nombre}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</div>
					{formik.errors.nombre && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.nombre}</p>
						</div>
					)}
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="costo"
						>
							Precio de compra:
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="number"
							name="costo"
							id="costo"
							step="0.1"
							min="0"
							placeholder="Costo"
							value={formik.values.costo}
							onChange={formik.handleChange}
						/>
					</div>
					{formik.errors.costo && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.costo}</p>
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
							value={formik.values.venta}
							onChange={formik.handleChange}
						/>
					</div>
					{formik.errors.venta && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.venta}</p>
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
							step="0.1"
							placeholder="Cantidad"
							value={formik.values.cantidad}
							onChange={formik.handleChange}
						/>
					</div>
					{formik.errors.cantidad && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
							<p className="font-bold">Error</p>
							<p>{formik.errors.cantidad}</p>
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
							value={formik.values.categoria}
							onChange={formik.handleChange}
						>
							<option value="">-- SELECCIONE --</option>
							<option value="HOGAR">HOGAR</option>
							<option value="GOLOSINAS">GOLOSINAS</option>
							<option value="PERSONALES">PERSONALES</option>
						</select>
					</div>
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Crear Producto"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default NuevoProducto;
