import React,{useContext} from 'react';

import authContext from "../../context/autenticacion/authContext"

const Header = () => {
    // Context
    const {usuario,cerrarSesion} = useContext(authContext);

    if (!usuario) return null; 

    return ( 
        <div className="flex justify-between mb-10">
			<p className="mr-2">
				Hola: {usuario.nombre} {usuario.apellido}
			</p>
			<button
				type="button"
				className="bg-gray-800 w-auto font-bold uppercase text-xs rounded py-2 px-2 text-white shadow-md"
				onClick={() =>  cerrarSesion()}
			>
				Cerrar Sesión
			</button>
		</div>
    );
}

export default Header;