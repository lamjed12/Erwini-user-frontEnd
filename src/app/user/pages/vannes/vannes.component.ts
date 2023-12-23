import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { vanneService } from '../../../services/vanne.service';
import { vanne } from '../../../model/vanne';
import { NgForm } from '@angular/forms';
import { MesureService } from 'src/app/services/mesure.service';
import { SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HistoriqueService } from 'src/app/services/historique.service';



@Component({
  selector: 'app-vannes',
  templateUrl: './vannes.component.html',
  styleUrls: ['./vannes.component.css']
})


 
export class vannesComponent implements OnInit {
  public vannes : vanne[] | undefined
  deleteCommand: any;
  addProduct: any;
  editMission: any;
  isStarted: boolean = true;
  userId!: string | null;


    mesure: {
      tem_sol: number;
      humidity: number;
    } | undefined;
    // other properties related to the vanne object
  
  // temperatureValue: number = 25;
  // humidityValue: number = 50;
  
  constructor(private vanneService: vanneService,private historiqueService: HistoriqueService,
    private mesureService: MesureService,private route: ActivatedRoute,private userService: UserService,) { }
  public isinputshown : boolean = false;
  
  public hideinput(): void{
    this.isinputshown=false;   }

  ngOnInit(): void {
     this.userId = this.userService.getUserId();
    console.log("userId"+     this.userId )
 
   this.getProduit();
  }
  

  updateSensorData() {

    mesure: {
      tem_sol: Number;
      // other properties related to mesures
    };
  //   // Call API to retrieve sensor values
  //   // ...
  //   // Once API returns data, update component properties
  //   this.temperatureValue = 30;
  //   this.humidityValue = 65;
  }

  public getProduit(): void {
    console.log(this.userId);
    this.vanneService.getVanneByUser(this.userId).subscribe({
      next: (response: vanne[]) => {
        console.log(response);
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          this.mesureService.getmesureById(element.mesures).subscribe({
            next: (response: any) => {
              console.log(response);
              element.mesures = response;
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);

            },
            complete: () => {
              console.log('complete');
      
            }
          });
          console.log(response)
          this.vannes = response;
        }
       
        
        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        console.log('complete');
        }
    });
  }
  


  public onOpenModal1(mission:any, mode: string): void {

    
    const container = document.getElementById('main-container') ;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
   /* if (mode === 'add') {
  
      button.setAttribute('data-target', '#addMissionModal');
      console.log(mission)
    }
*/
    if (mode === 'add') {
      console.log(mission)
      button.setAttribute('data-target', '#myModal');
     
    }
   
      
    if (mode === 'delete') {
      console.log("11111",mission)

      this.deleteCommand = mission;
      console.log("22222",this.deleteCommand._id)
      button.setAttribute('data-target', '#deleteCommand');

      
    }  

    if (mode === 'edit') {
      console.log(mission)

      this.editMission = mission;
      console.log("22222",this.deleteCommand._id)
      button.setAttribute('data-target', '#updateMissionModal');

      
    }  
    
    
    
    container!.appendChild(button);
    button.click();
  }

public onAddMission(addForm: NgForm): void {
  console.log("addForm.valueaddForm.valueaddForm.value")
    console.log(addForm.value)
 //   document.getElementById('add-mission-form')!.click();
    // const fd = new FormData();
    // fd.append('nom',addForm.value.nom)
    // fd.append('categorie',addForm.value.categorie)
    // fd.append('description',addForm.value.description)
    // fd.append('marque',addForm.value.marque)
    // fd.append('quantite',addForm.value.quantite)
    // fd.append('prix',addForm.value.prix)
    
  
    this.vanneService.addvanne(addForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getProduit();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
      complete: () => {
        console.log('complete');

      }
    });
  } 


  public ChangeVanneStatus(vanne: any) {
    console.log("vanne");
    console.log(vanne);
    vanne.status = !vanne.status;
    console.log(vanne);
    if( vanne.status) {
      var typeAction = "Active vanne"
    }else {
      var typeAction = "Stop vanne"
    }
  // Call the service method to update the vanne status
  this.vanneService.updatevanne(vanne).subscribe({
    next: (response: any) => {
      console.log('Vanne status updated successfully:', response);
      //Add it to historiqur

      this.historiqueService.addhistoriqueForAdmin({
        "phoneAgrecuteur":this.userId,
        "typeAction":typeAction
    }).subscribe({
      next: (response: any) => {
      },
      error: (error: HttpErrorResponse) => {
      },
      complete: () => {
        console.log('complete');
      }
    });
    },
    error: (error: any) => {
      console.error('Error updating vanne status:', error);
    }
  });

  }

  public onUpdateProduit(editForm: NgForm) : void{

    console.log("editForm.value._ideditForm.value._ideditForm.value._id")
    console.log(editForm.value._id)
    
      
       this.vanneService.updatevanne(editForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.getProduit();
          editForm.reset();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
          editForm.reset();
        },
        complete: () => {
          console.log('complete');
        }
      });
  }

  onDeleteMission(id : any){
    console.log('id',id);
    this.vanneService.deletevanne(id).subscribe({
      next: (response: any) => {
        console.log(response);

        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        this.getProduit();
        console.log('complete');
        }
    });

    

  }
 


}
