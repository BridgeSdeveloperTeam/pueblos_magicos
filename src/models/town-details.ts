export interface TownDetails {
	id: string;
	nombre: string;
	imagen: string;
	descripcion: string;
	latitud: string;
	longitud: string;
	galería: Array<string>;
	splashart: string;

	queHacer: Array<Object>;
	historia: Array<Object>;
	festividades: Array<Object>;
	recomendado: Array<Object>;
	
}