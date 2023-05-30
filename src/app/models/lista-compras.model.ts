export interface ListaCompras {
  id?: string;
  fecha_lista: string;
  nombre_lista: string;
  idusuario: String;
}

export interface createListaComprasDTO extends ListaCompras{

}

export interface updateListaComprasDTO extends Partial<createListaComprasDTO>{}
