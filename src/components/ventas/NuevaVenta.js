import React,{ useContext, useEffect } from 'react';
import {useFormik} from "formik";
import * as Yup from "yup";

import ventasContext from "../../context/ventas/ventasContext";

import Layout from "../Layout/Layout";
import AsignarProductos from "./AsignarProductos";
import AsignarCantidades from "./AsignarCantidades";

const NuevaVenta = ({history}) => {
    // context
    const {totalventa, nuevaVenta, mensajeventa } = useContext(ventasContext);

    useEffect(() => {
        if (mensajeventa) {
            if (mensajeventa.categoria === "success") {
                history.push("/ventas");
            }
        }
        // eslint-disable-next-line
    }, [mensajeventa])

    const formik = useFormik({
		initialValues: {
			nombre: "",
			metodo: "",
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required("Debes identificar la venta"),
			metodo: Yup.string().required("Debes identificar el método de pago"),
		}),
		onSubmit: (datos) => {
            datos.total = totalventa;
			nuevaVenta(datos);
		},
	});
    return ( 
        <Layout>
            <button
				type="button"
				className="mt-4 bg-blue-800 px-5 py-2 block text-white rounded leading-tight uppercase text-xs font-bold text-center mb-10 w-full md:w-auto"
				onClick={() => history.goBack()}
			>
				Regresar
			</button>
            <h1 className="text-2xl text-gray-800 font-light">Nueva Venta</h1>

            <div className="flex justify-center mt-5">
				<form
					className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
					onSubmit={formik.handleSubmit}
				>
					<AsignarProductos />
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
							htmlFor="metodo"
						>
							Método de pago:
						</label>
						<select
							name="metodo"
							id="metodo"
							className="mt-2 shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none uppercase w-full"
							value={formik.values.metodo}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						>
							<option value="">-- SELECCIONE --</option>
							<option value="EFECTIVO">EFECTIVO</option>
							<option value="TARJETA">TARJETA</option>
							<option value="TRANSFERENCIA">TRANSFERENCIA</option>
						</select>
					</div>
					{formik.errors.metodo && (
						<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
							<p>
								{" "}
								<span className="font-bold">Error:</span> {formik.errors.metodo}
							</p>
						</div>
					)}
					<input
						type="submit"
						className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
						value="Nueva Venta"
					/>
				</form>
			</div>
        </Layout>
    );
}

export default NuevaVenta;