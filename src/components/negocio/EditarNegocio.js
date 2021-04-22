import React,{ useContext, useEffect } from 'react';
import { Formik } from "formik";
import * as Yup from "yup";

import authContext from "../../context/autenticacion/authContext";

import Layout from "../Layout/Layout";

const EditarNegocio = ({history}) => {
    const { negocio, editarNegocio, mensaje} = useContext(authContext);

    useEffect(() => {
        if (mensaje) {
            if (mensaje.categoria === "success") {
                history.push("/negocio");
            }
        }
        // eslint-disable-next-line
    }, [mensaje])

    if (!negocio) return null;

    const handleSubmit = (datos) => {
        editarNegocio(datos);
    }

    const validationSchema = Yup.object({
		nombre: Yup.string().required("El nombre es obligatorio"),
	});
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Negocio</h1>

            <div className="flex justify-center mt-5">
				<Formik
					enableReinitialize
					initialValues={negocio}
                    validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props) => {
						return (
							<form
								onSubmit={props.handleSubmit}
								className="w-full max-w-sm bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
										htmlFor="direccion"
									>
										Dirección
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="direccion"
										id="direccion"
										placeholder="Dirección"
										value={props.values.direccion}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
                                <div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="ciudad"
									>
										Ciudad
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="ciudad"
										id="ciudad"
										placeholder="Ciudad"
										value={props.values.ciudad}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
                                <div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="telefono"
									>
										Teléfono
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="text"
										name="telefono"
										id="telefono"
										placeholder="Telefono"
										value={props.values.telefono}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								<div className="mb-4">
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="email"
									>
										Email
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										type="email"
										name="email"
										id="email"
										placeholder="Email"
										value={props.values.email}
										onChange={props.handleChange}
										onBlur={props.handleBlur}
									/>
								</div>
								<input
									type="submit"
									className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
									value="Editar Negocio"
								/>
							</form>
						);
					}}
				</Formik>
			</div>
        </Layout>
    );
}

export default EditarNegocio;