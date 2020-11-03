const productItems = {
  items: 'Itens',
  newItem: 'Novo item',
  total: 'Total',
  totalQtd: (totalQtd: number) => `Quantidade: ${totalQtd}`,
  amount: `Valor`,
  qtd: `Quantidade`,
  qtdTimes: (qtd: number | string, currency: string, price: string) =>
    `${qtd}x ${currency} ${price}`,

  dueDate: 'Data de vencimento',
  productExpireInDay: (product: string, date: string) =>
    `Atenção, o produto "${product}" está vencendo no dia ${date}`,
  brand: 'Marca',
  qtdDefault: (value: number) => `Padrão: ${value}`,
  insertQtd: 'Insira a quantidade',
  itemsInList: (totalItems: number) => `Itens na lista: ${totalItems}`,
};

export default productItems;
