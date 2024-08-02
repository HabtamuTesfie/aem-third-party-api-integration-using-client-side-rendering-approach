import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../service/provider.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {
  providers: any;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.providerService.getProviderData().subscribe(data => {
      console.log("Entire response data:", data);
      this.providers = data.medical_providers;
      console.log("providers data", this.providers);
    });
  }
}
