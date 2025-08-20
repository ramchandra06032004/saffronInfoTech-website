export interface PowerPlant {
  _id: string;
  govId: string;
  nameOfOwner: string;
  mobileNumber: string;
  address: string;
  capacity: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  duration: number;
}