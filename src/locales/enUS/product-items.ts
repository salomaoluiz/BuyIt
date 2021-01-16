const productItems = {
  items: `Itens`,
  newItem: `New item`,
  total: `Total`,
  totalQtd: (totalQtd: number) => `Quantity: ${totalQtd}`,
  amount: `Amount`,
  qtd: `Quantity`,
  qtdTimes: `{{qtd}}x {{price}}`,
  dueDate: `Due date`,
  productExpireInDay: `Attention, the product "{{product}}" has the duedate to {{date}}`,
  brand: `Brand`,
  qtdDefault: (value: number) => `Default: ${value}`,
  insertQtd: `Insert the quantity`,
  itemsInList: (totalItems: number) => `Items in list: ${totalItems}`,
};

export default productItems;
