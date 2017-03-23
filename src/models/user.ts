export class User {
	id: string;
	nombre: string;
	apellido: string;
	foto_perfil: string;
	correo:string;
	estado_id: string;
	edad: number;
	genero_id: string;
	password: string;

	constructor() {
		this.id = "";
		this.nombre = "";
		this.apellido = "";
		this.foto_perfil = "";
		this.correo = "";
		this.estado_id = "";
		this.edad = 0;
		this.genero_id = "";
		this.password = "";
	}
}