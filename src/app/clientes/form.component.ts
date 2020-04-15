import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  title: string = "Crear instrumento";
  errores: string[];


  constructor(private clienteService: ClienteService,
    private router: Router,
    private activeRouter: ActivatedRoute) { }

  ngOnInit() {
    this.loadCliente();
  }

  public loadCliente(): void {
    this.activeRouter.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getOneCliente(id).subscribe(cliente => this.cliente = cliente[0])
      }
    })
  }

  public create(): void {
    this.clienteService.createClientes(this.cliente)
    .subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Instrumento guardado', `Instrumento creado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);        
      }
    );
  }

  public updateCliente(): void {
    this.clienteService.updateCliente(this.cliente)
      .subscribe(
        json => {
        this.router.navigate(['/clientes'])
        swal.fire('Instrumento actualizado', `Instrumento actualizado con éxito`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error(err.error.errors);        
      }
    );
  }

}
