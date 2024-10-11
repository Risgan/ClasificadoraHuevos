import { Injectable } from '@angular/core';
import { Clasificador, ClasificadorCreate } from './clasificador';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataTable: Clasificador[] = []; // Array vacío para almacenar los datos
  private index = 0; // Índice para asignar a los objetos


  private apiUrl = 'https://localhost:44320/api/';


  constructor(
    private http: HttpClient
  ) { }

  create(data: ClasificadorCreate): Clasificador {
 
    const newClasificador: Clasificador = {
      id: this.index++ +1, // Asigna el índice y lo incrementa
      ...data // Combina las propiedades de data con el nuevo id
    };


    this.dataTable.push(newClasificador);
    return newClasificador; // Devuelve el objeto creado
  }

  // Leer todos
  readAll(): Clasificador[] {
    return this.dataTable;
  }

  // Leer por ID
  readById(id: number): Clasificador | undefined {
    return this.dataTable.find(item => item.id === id);
  }

  // Actualizar
  update(id: number, updatedData: Clasificador): Clasificador | undefined {
    const index = this.dataTable.findIndex(item => item.id === id);
    if (index !== -1) {
      this.dataTable[index] = { ...this.dataTable[index], ...updatedData };
      return this.dataTable[index]; // Devuelve el objeto actualizado
    }
    return undefined; // Si no se encuentra, devuelve undefined
  }

  // Eliminar
  delete(id: number): boolean {
    const index = this.dataTable.findIndex(item => item.id === id);
    if (index !== -1) {
      this.dataTable.splice(index, 1); // Elimina el objeto del array
      return true; // Devuelve verdadero si se eliminó con éxito
    }
    return false; // Si no se encuentra, devuelve falso
  }

  getIndex(): number {
    return this.index;
  }


  getPuertosComList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}PuertosCom/list`);
  }

}
