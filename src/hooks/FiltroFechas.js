import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const FiltroFechas = ({fn}) => {
    
	const formik = useFormik({
		initialValues: {
			fechai: "",
			fechaf: "",
		},
		validationSchema: Yup.object({
			fechai: Yup.date()
				.max(Yup.ref("fechaf"),"La fecha inicial no puede ser mayor que la final")
				.required("La fecha incial es obligatoria"),
			fechaf: Yup.date().min(Yup.ref("fechai"),"La fecha final no puede ser menor que la inicial"),
		}),
		onSubmit: (datos) => {
			fn(datos);
		},
	});

	return (
		<form className="w-full mt-5" onSubmit={formik.handleSubmit}>
			{formik.errors.fechai && (
				<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
					<p>
						{" "}
						<span className="font-bold">Error:</span> {formik.errors.fechai}
					</p>
				</div>
			)}
			{formik.errors.fechaf && (
				<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-2">
					<p>
						{" "}
						<span className="font-bold">Error:</span> {formik.errors.fechaf}
					</p>
				</div>
			)}
			<div className="md:flex justify-center">
				<div className="md:mr-5 w-full mb-4 md:mb-0">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="fechai"
					>
						Fecha Inicial:
					</label>
					<input
						className="w-full shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none"
						type="date"
						name="fechai"
						id="fechai"
						onChange={formik.handleChange}
						value={formik.values.fechai}
					/>
				</div>
				<div className="w-full">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="fechaf"
					>
						Fecha Final:
					</label>
					<input
						className="w-full shadow border text-gray-700 p-2 text-center rounded leading-tight focus:outline-none md:mr-5"
						type="date"
						name="fechaf"
						id="fechaf"
						onChange={formik.handleChange}
						value={formik.values.fechaf}
					/>
				</div>
			</div>
			<div className="mt-5">
				<input
					type="submit"
					className="bg-gray-800 rounded w-full p-2 text-white uppercase hover:bg-gray-900"
					value="Buscar"
				/>
			</div>
		</form>
	);
};

export default FiltroFechas;
