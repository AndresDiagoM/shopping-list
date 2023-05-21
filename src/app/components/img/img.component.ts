import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img', //con este selector es que podemos llamar a este componente en el html de otro componente
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  //--------Propiedades--------

  @Input() valor: string = "valor inicial en img component";
  // @Input() es para recibir datos desde el componente padre
  @Input() img: string = "";
  imgDefault: string = "https://www.meteorologiaenred.com/wp-content/uploads/2018/07/Planeta-J%C3%BApiter.png";

  @Output() imgLoadedEvent = new EventEmitter<string>();

  counter: number = 0;
  counterFn: number | undefined;

  //--- para escuchar el cambio de un input en específico es necesario usar set y get
  private new_img: string = "";
  @Input()
  set img2(value: string) {
    console.log("set img2: ", value);
    this.new_img = value;
    // aqui se pone codigo que queremos que se ejecute cuando cambie este input
  }

  constructor() {
    // before render
    // aqui no se debe correr nada asincrono
    //console.log("constrcutor de img component", "img: ", this.img);
  }

  ngOnChanges(changes: SimpleChanges) { //implements OnChanges, hay que declarar el método ngOnChanges
    // before and on the life cycle
    // esta funcion está pendiente de los cambios de los inputs
    //console.log("ngOnChanges de img component", "img: ", this.img);
    //console.log("changes: ", changes); //esto ocuure para cualquier cambio en cualquier input
    //para escuchar el cambio de un input en específico es necesario usar set y get
  }

  ngOnInit(): void {
    // before render
    // aqui se puede correr algo asincrono - fecth, promesas, etc
    //console.log("ngOnInit de img component", "img: ", this.img);
    // if(this.img){
    //   this.counterFn = window.setInterval(() => {
    //     this.counter++;
    //     console.log("counter: ", this.counter);
    //   }, 1000);
    // }
  }

  ngAfterViewInit() {
    // after render
    // aqui se maneja los hijos del componente
    //console.log("ngAfterViewInit de img component");
  }

  ngOnDestroy() {
    // before destroy
    // aqui se limpian los observables, intervalos, etc
    // window.clearInterval(this.counterFn);
    //console.log("ngOnDestroy de img component");
  }

  //--------MÉTODOS--------
  // @Output() es para enviar datos al componente padre
  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    //console.log("[HIJO] imagen cargada (en hijo)");
    this.imgLoadedEvent.emit(this.img); //emitir algo al padre
  }

}

