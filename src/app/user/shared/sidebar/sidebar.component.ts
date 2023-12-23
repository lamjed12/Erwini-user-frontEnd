import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId: string | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to the query parameters observable
    this.route.queryParams.subscribe(params => {
     // Access the 'id' parameter from the queryParams
     this.userId = params['id'];
     console.log('User ID:', params['id']);
     // Now, you can use this.userId in your component as needed
     console.log('User ID:', this.userId);
   });
  }

}
