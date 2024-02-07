export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export enum QueueStatus { OPEN, CLOSED}
export enum Species  { FELINE, CANINE }
export enum Gender { MALE , FEMALE}

export enum MedicalRecordStatus { ATTENDED, PENDING }

export interface Fila {
  id?: number;
  name: string;
  queueStatus: QueueStatus;
  room: Room;
  medicalRecords: MedicalRecord[];
  userCode: string;
  code: string;
  doctor: User;
}

export interface User {
  id?: number;
  name: string;
  profileTypeEnum?: 'DOCTOR' | 'SECRETARY' | 'DIRECTOR'
}


export interface Room {
  id?: number;
  name: string;
}

export interface MedicalRecord {
  id?: string;
  petName: string;
  tutor: string;
  weight: number;
  registerDate: string;
  complaint: string;
  species: 'FELINE' | 'CANINE' | null;
  gender: 'MALE' | 'FEMALE' | null;
  attendanceOrder: number;
  medicalRecordStatus: 'ATTENDED' | 'PENDING' | null;
  queue: Fila;
}
