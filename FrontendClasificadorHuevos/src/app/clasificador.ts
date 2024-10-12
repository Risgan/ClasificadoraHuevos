export interface Clasificador {
    id: number;
    categoria: string;
    limpio: number;
    sucio: number;
  
  }

  export interface ClasificadorCreate extends Omit<Clasificador, 'id'> {

  }


  export interface ImagePredict{
    resultado: string;
    limpio: number;
    sucio: number;
  }