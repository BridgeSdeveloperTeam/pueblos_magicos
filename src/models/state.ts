import { TownOverview } from '../models/townOverview';

export interface State {
	id: string;
	nombre: string;
	imagen: string;
	pueblos: Array<TownOverview>;

}