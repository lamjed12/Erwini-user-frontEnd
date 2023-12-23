import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthentifcationService } from 'src/app/services/Authentifcation.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  email: string = '';
  errorMessage = '';
  visible: boolean = true;
  changetype: boolean = true;

  viewpass(){
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  constructor(private router: Router,  private authentifcationService: AuthentifcationService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.clearUserId();
  }

  

  login() {
    console.log(this.email);
    console.log(this.password);
    this.authentifcationService.authentifierAgriculteur(this.email, this.password).subscribe(
      (response) => {
        // Handle successful login response
        console.log(response);
       // Store the user ID in the UserService
        this.userService.setUserId(response.agriculteur._id);
        this.router.navigateByUrl(`/moteur?id=${response.agriculteur._id}`);
      },
      (error) => {
        // If the user is not authenticated, display an error message
        this.errorMessage = 'Invalid email or password';
        // Reset the email and password fields
        this.email = '';
        this.password = '';
      }
    );
  }

}
