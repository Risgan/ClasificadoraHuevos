export interface Clasificador {
    id: number;
    categoria: string;
    limpio: number;
    sucio: number;
  
  }

  export interface ClasificadorCreate extends Omit<Clasificador, 'id'> {

  }