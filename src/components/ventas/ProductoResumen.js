import React,{ useState, useEffect } from "react";

const ProductoResumen = ({producto, cantidadProductos, actualizarTotal}) => {
    const { nombre, precioVenta } = producto;

	const resumenAnterior = {}
	if (producto.resumen) {
		resumenAnterior.cantidad = producto.resumen.cantidad;
		resumenAnterior.precio = producto.resumen.precio;
	} else {
		resumenAnterior.cantidad = 0;
		resumenAnterior.precio = precioVenta;
	}

    const [error, setError] = useState("");
	const [resumen, setResumen] = useState(resumenAnterior);

    useEffect(() => {
        if (resumen.cantidad > 0 && resumen.precio > 0) {
			cantidadProductos({ ...producto, resumen });
			actualizarTotal();
			setError("");
		} else {
			setError("No puedes ingresar una cantidad o un precio negativo");
		}
		// eslint-disable-next-line
    }, [resumen])

    const handleChange = (e) => {
		setResumen({
			...resumen,
			[e.target.name]: Number(e.target.value),
		});
	};

	return (
		<div className="border-b-2 border-gray-700 mb-2">
			<div className="md:flex md:justify-between md:items-center mt-5">
				<div className="md:w-2/4 mb-2 md:mb-0">
					<p className="text-gray-700 text-sm font-bold">Producto: {nombre}</p>
				</div>
				<div className="mb-4 md:mr-2">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="monto"
					>
						Cantidad:
					</label>
					<input
						type="number"
						placeholder="cantidad"
						name="cantidad"
						step="0.1"
						value={resumen.cantidad}
						className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={handleChange}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="monto"
					>
						Precio:
					</label>
					<input
						type="number"
						placeholder="Precio"
						name="precio"
						step="0.1"
						value={resumen.precio}
						className="md:mt-0 shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						onChange={handleChange}
					/>
				</div>
			</div>
			{error.length > 0 && (
				<div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-2">
					<p>Error: {error}</p>
				</div>
			)}
		</div>
	);
};

export default ProductoResumen;
