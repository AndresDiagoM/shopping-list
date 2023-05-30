export interface ListaProductos {
  id?: string;
  idlista_compras: string;
  idproducto: string;
  estado: boolean;
}

export interface createListaProductosDTO extends ListaProductos{

}

export interface updateListaProductosDTO extends Partial<createListaProductosDTO>{}
