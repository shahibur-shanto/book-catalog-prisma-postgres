export type IOrder = {
  userId: string;
  orderBooks: {
    bookId: string;
    quantity: number;
  }[];

  // role: string;
};
