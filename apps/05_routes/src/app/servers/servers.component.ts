import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from './servers.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  public servers: { id: number; name: string; status: string }[] = [];

  constructor(
    private serversService: ServersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.servers = this.serversService.getServers();
  }

  onReload() {
    // diferente do routerLink, o navigate entende onde estamos e não erra ao navegar para mesma rota de forma relativa
    // porem se passamos a opção de relativeTo, ai ele tenta encontrar a rota /servers/servers e da um erro
    this.router.navigate(['servers'], { relativeTo: this.route });
  }
}
