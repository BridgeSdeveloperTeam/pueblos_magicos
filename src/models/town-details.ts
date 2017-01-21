export interface TownDetails {
	id: string;
	nombre: string;
	imagen: string;
	descripcion: string;
	ubicacion: string;
	galeria: Array<string>;

	queHacer: Array<Object>;
	historia: Array<Object>;
	festividades: Array<Object>;
	recomendado: Array<Object>;
	
}