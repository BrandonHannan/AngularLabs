export interface Product {
  _id?: string; // MongoDB's ID is optional as it is not present on creation
  Id: number;
  Name: string;
  Description: string;
  Price: number;
  units: number;
}