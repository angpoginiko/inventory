export type Item = {
    description: string;
    id: string;
    quantity: number;
    price: number;
    status: Status;
};

export type Cart = {
    description: string;
    quantity: number;
    price: number;
    id: string;
};

export type Status =
  | 'Out of stock'
  | 'Limited Stock'
  | 'In Stock';