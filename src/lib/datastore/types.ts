export interface LoadData {
  id: string;
  matricula: string;
  nombre: string;
  dni: string;
  carrierName: string;
  createdAt: string;
  updatedAt: string;
}

export type NewLoadData = Omit<LoadData, 'createdAt' | 'updatedAt'>;
