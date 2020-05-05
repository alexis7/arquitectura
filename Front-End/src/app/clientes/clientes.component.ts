import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  public deleteCliente(cliente: Cliente): void{
    swal.fire({
      title: 'Esta seguro?',
      text: "No puede revertir este cambio!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.deleteCliente(cliente.id).subscribe(
          json => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal.fire(
              'Eliminado!',
              `El registro ha sido eliminado.`,
              'success'
            )
          }
        )
      }
    })

  }

}
