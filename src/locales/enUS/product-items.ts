const productItems = {
  items: `Itens`,
  newItem: `new Item`,
  total: `Total`,
  totalQtd: (totalQtd: number) => `Quantity: ${totalQtd}`,
  amount: `Amount`,
  qtd: `Quantity`,
  qtdTimes: (qtd: number | string, currency: string, price: string) =>
    `${qtd}x ${currency} ${price}`,

  dueDate: `Due date`,
  productExpireInDay: (product: string, date: string) =>
    `Attention, the product "${product}" has the duedate to ${date}`,
  brand: `Brand`,
  qtdDefault: (value: number) => `Default: ${value}`,
  insertQtd: `Insert the quantity`,
  itemsInList: (totalItems: number) => `Items in list: ${totalItems}`,
};

export default productItems;
