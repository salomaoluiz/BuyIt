const productLists = {
  lists: 'Listas',
  newList: 'Nova lista',
  items: 'Itens',
  newItem: 'Novo item',
  total: 'Total',
  totalQtd: (totalQtd: number): string => `Quantidade: ${totalQtd}`,
  amount: `Valor`,
  qtd: `Quantidade`,
  dueDate: "Data de vencimento",
  productExpireInDay: (product: string, date: string) => `Atenção, o produto "${product}" está vencendo no dia ${date}`,
  brand: 'Marca',
  qtdDefault: (value: number) => `Padrão: ${value}`,
  insertQtd: 'Insira a quantidade',
  itemsInList: (totalItems: number) => `Itens na lista: ${totalItems}`,
};

export default productLists;
