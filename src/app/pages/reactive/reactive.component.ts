import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor( private fb: FormBuilder ) { 

    this.crearFormulario();
    this.cargarDataAlFormulario();

   }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  crearFormulario() {
    
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email] ],
      direccion: this.fb.group({
        distrito: ['', Validators.required ],
        ciudad: ['', Validators.required ],
      }),
      pasatiempos: this.fb.array([])
    });

  }

  cargarDataAlFormulario() {

    this.forma.reset({
          nombre: "carlos",
      apellido: "fernandez",
      correo: "carlos@gmail.com",
      direccion: {
      distrito: "apizyork",
        ciudad: "tlaxcala"
      }
    });

  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control('', Validators.required) );
  }

  borrarPasatiempo( i: number ){
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);

    if ( this.forma.invalid ) {
      return Object.values( this.forma.controls ).forEach( control => {
        control.markAsTouched();
      });
    }
  }

}
