import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { puitService } from '../../../services/puit.service';
import { puit } from '../../../model/puit';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Pompe } from 'src/app/model/pompe';
import { PompeService } from 'src/app/services/pompe.service';
import { AgendaService } from 'src/app/services/agenda.service';
import { Agenda } from 'src/app/model/agenda';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HistoriqueService } from 'src/app/services/historique.service';
// import * as jQuery from 'jquery';
// import 'jqueryui';
// declare var $: any;


@Component({
  selector: 'app-moteurs',
  templateUrl: './moteurs.component.html',
  styleUrls: ['./moteurs.component.css']
})
 
export class moteursComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();
  
  // dateToday(): Date {
  //   const now = new Date();
  //   const year = now.getFullYear();
  //   const month = now.getMonth() + 1;
  //   const day = now.getDate();
  //   const hour = now.getHours();
  //   const minute = now.getMinutes();
  //   return new Date(year, month, day, hour, minute);
  // } 

  dateToday(): string {
    return new Date().toISOString().split('.')[0];
  }



  myForm = new FormGroup({
    date_debut: new FormControl('', Validators.required)
  });
  public puits : puit[] | undefined;
  public agendaPompes : Agenda[] | undefined;
  public agendaofPompe : Agenda[] | undefined;
  public agendaOfPuits : Agenda[] | undefined;
  public agendaPuits : Agenda[] | undefined;
  public pompes : Pompe[] | undefined;
  deleteCommand: any;
  addProduct: any;
  editPompe: Pompe | undefined;
  editMission: any;
  editPuit: puit | undefined;
  puit: any;

  pompe: any;
  addPlanifierPompeForm: any;
  addPlanifierPuitForm: any;
  siwtchSecurity: boolean = false;
  toggleState = false;
  userId!: string | null;
  Id: string | undefined;
  // date_debut: Date = new Date();
  // date_fin: Date;
  
  
  
  
  constructor(private puitService: puitService,private pompeService: PompeService,private agendaService: AgendaService,private historiqueService: HistoriqueService,
    private route: ActivatedRoute, private userService: UserService,) {
    // this.date_debut = new Date();
    // this.date_fin = new Date();
   }

  
  

  ngOnInit(): void {
    this.userId = this.userService.getUserId();
    console.log("userId"+ this.userId)    
   this.getPuits();
   this.getPompes();
   this.getAgendsPompe();
   this.getAgendsPuit();
 
  }


  public getPuits(): void {
    console.log(this.userId);

    this.puitService.getpuitByUser(this.userId).subscribe({
      next: (response: puit[]) => {
        console.log(response);
        console.log("responseresponseresponseresponseresponseresponse");
        this.puits = response;
        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        console.log('complete');
        }
    });
  }
  

  public getPompes(): void {


    this.pompeService.getPompeByUser( this.userId).subscribe({
      next: (response: Pompe[]) => {
        console.log( response);
     
        this.pompes = response;
        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        console.log('complete');
        }
    });
  }
  

  public getAgendsPuit(): void {
   
    this.agendaService.getagendasByType("puit").subscribe({
      next: (response: Agenda[]) => {
        console.log(response);
        console.log("getAgendsPuit: vvjj");
       // this.agendaPompes = response;
        for (let index = 0; index < response.length; index++) {
          const date_debut = response[index].date_debut;
          const date_fin = response[index].date_fin;
          if(this.isStartDatePassed(date_debut)){
            console.log("7ilha puit");   
            // Active the Pompe
           this.puitService.getpuitByAgenda(response[index]).subscribe({
              next: (response: any) => {
                if(response.length != 0){
                  console.log("Puit");
                  console.log(response);
                  for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    element.Active = "true";
                    this.puitService.updatepuit(element).subscribe({
                             next: (response: any) => {
                                 console.log(response);
                                 this.historiqueService.addhistoriqueForAdmin({
                                  "phoneAgrecuteur":this.userId,
                                  "typeAction": "Active puit"
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
                             error: (error: HttpErrorResponse) => {
                               alert(error.message); 
                             },
                             complete: () => {
                               console.log('complete');
                             }
                           });
                  }
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
          if(this.isStartDatePassed(date_fin)){
            console.log("saker");  
            //Ferme the Pompe
            this.puitService.getpuitByAgenda(response[index]).subscribe({
              next: (response: any) => {
                if(response.length != 0){
                  console.log("Pompe");
                  console.log(response);
                  for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    element.active = "false";
       
                           this.puitService.updatepuit(element).subscribe({
                             next: (response: any) => {
                                console.log("hhhh");
                                //this.editPuit = response;
                                 console.log(response);
                                 console.log(element._id);
                                 //this.deleteAppointmentPuit(element._id)
                                 this.historiqueService.addhistoriqueForAdmin({
                                  "phoneAgrecuteur":this.userId,
                                  "typeAction": "Stop puit"
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
                             error: (error: HttpErrorResponse) => {
                               alert(error.message);
                               
                             },
                             complete: () => {
                               console.log('complete');
                             }
                           });
                  }
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
        }
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        console.log('complete');
        }
    });
  
    this.agendaService.getagendasByType("puit").subscribe({
      next: (response: Agenda[]) => {
        console.log(response);
        console.log("responseresponseresponseresponseresponseresponse");
      // this.getAgendsPuit();   
           },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        console.log('complete');
        }
    });
  }

  public getAgendsPompe(): void {
    this.agendaService.getagendasByType("pompe").subscribe({
      next: (response: Agenda[]) => {
        console.log(response);
        console.log("getAgendsPompe: vvjj");
       // this.agendaPompes = response;
        for (let index = 0; index < response.length; index++) {
          const date_debut = response[index].date_debut;
          const date_fin = response[index].date_fin;
          if(this.isStartDatePassed(date_debut)){
            console.log("7ilha");   
            // Active the Pompe
           this.pompeService.getpompeByAgenda(response[index]).subscribe({
              next: (response: any) => {
                if(response.length != 0){
                  console.log("Pompe");
                  console.log(response);
                  for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    element.active = "true";
       
                           this.pompeService.updatepompe(element).subscribe({
                             next: (response: any) => {
                                 console.log(response);
                                 this.historiqueService.addhistoriqueForAdmin({
                                  "phoneAgrecuteur":this.userId,
                                  "typeAction": "Active pompe"
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
                             error: (error: HttpErrorResponse) => {
                               alert(error.message);
                               
                             },
                             complete: () => {
                               console.log('complete');
                             }
                           });
                  }
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
          if(this.isStartDatePassed(date_fin)){
            console.log("saker");  
            //Ferme the Pompe
            this.pompeService.getpompeByAgenda(response[index]).subscribe({
              next: (response: any) => {
                if(response.length != 0){
                  console.log("Pompe");
                  console.log(response);
                  for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    element.active = "false";
       
                           this.pompeService.updatepompe(element).subscribe({
                             next: (response: any) => {
                                 console.log(response);
                                 this.editPompe = response;
                                 this.deleteAppointmentPompe(element._id);
                                 this.historiqueService.addhistoriqueForAdmin({
                                  "phoneAgrecuteur":this.userId,
                                  "typeAction": "Stop pompe"
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
                             error: (error: HttpErrorResponse) => {
                               alert(error.message);
                               
                             },
                             complete: () => {
                               console.log('complete');
                             }
                           });
                  }
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

      this.editPuit = mission;

      this.puitService.getpuitById(this.editPuit).subscribe({
        next: (response: any) => {
        
          console.log("response.Agenda.length"+ response.Agenda.length);
          for (let index = 0; index < response.Agenda.length; index++) {
            console.log(index);
            console.log("index");
            console.log(response.Agenda[index]);
          this.agendaService.getagendasById(response.Agenda[index]).subscribe({
            next: (response: Agenda) => {
              console.log(response);
              console.log("responseresponseresponseresponseresponseresponse");       
              if (!this.agendaOfPuits) {
                // If the agenda is undefined, initialize it as an empty array
                this.agendaOfPuits = [];
              }
           
          
              // Add the agenda item to the array
              this.agendaOfPuits.push(response);     
              //this.agendaofPompe?.push(response) ;
              console.log("puit"+ this.agendaOfPuits);    
              },
            error: (error: HttpErrorResponse) => {
                alert(error.message);
              },
            complete: () => {
              console.log('complete');
              }
          });
            // Function to clear (empty) the agenda
    
      this.agendaOfPuits = undefined;
    
        }
         
         
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
        complete: () => {
          console.log('complete');
        }
      });      console.log("22222",this.deleteCommand._id)
      button.setAttribute('data-target', '#updateMissionModal');

      
    }  

    if( mode == 'addNewPuit'){
      this.puit = mission;

    }

    
    container!.appendChild(button);
    button.click();
  }



public onAddMission(addForm: NgForm): void {
  console.log("addForm.valueaddForm.valueaddForm.value")
    console.log(addForm.value)
  
    this.puitService.addpuit(addForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getPuits();
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

    this.pompeService.addpompe(addForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getPompes();
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

  public onUpdateProduit(editForm: NgForm) : void{

    console.log("editForm.value._ideditForm.value._ideditForm.value._id")
    console.log(editForm.value._id)
    
      
       this.puitService.updatepuit(editForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.getPuits();
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

      this.pompeService.updatepompe(editForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
          this.getPompes();
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
    this.puitService.deletepuit(id).subscribe({
      next: (response: any) => {
        console.log(response);

        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        this.getPuits();
        console.log('complete');
        }
    });
    this.pompeService.deletepompe(id).subscribe({
      next: (response: any) => {
        console.log(response);

        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        this.getPompes();
        console.log('complete');
        }
    });
    

  }
 

// public addNewAppointment(addPlanifierPompeForm: NgForm){
//   console.log(addPlanifierPompeForm.value)
// }

public addNewAppointmenPuit(addPlanifierPuitForm: NgForm){
  console.log(addPlanifierPuitForm.value)
  console.log(this.puit._id)

  this.agendaService.addAgenda({
    'date_debut': addPlanifierPuitForm.value.date_debut,
    'date_fin': addPlanifierPuitForm.value.date_fin,
    'puit': this.puit._id,
    'type': 'puit'


  }).subscribe({
    next: (response: any) => {
      var newAgenda = response.id;
      console.log("agenda reponse of puit"+response.id);
      this.puitService.getpuitById(this.puit).subscribe({
        next: (response: any) => {
          console.log("puit reson"+response.Agenda);
     // Assuming response.agendas is initially an array
        response.Agenda.push(newAgenda);
        console.log("response.agenda"+response.Agenda);
        console.log("newAgendan"+newAgenda);

        this.puitService.updatepuit(response).subscribe({
          next: (response: any) => {
            console.log(response);
      
            
            },
          error: (error: HttpErrorResponse) => {
              alert(error.message);
            },
          complete: () => {
          // this.getAgendaOfPompe(this.editPompe);
            console.log('complete');
            }
        });

          },
        error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        complete: () => {
        // this.getAgendaOfPompe(this.editPompe);
          console.log('complete');
          }
      });

     this.getAgendsPuit();
      addPlanifierPuitForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addPlanifierPuitForm.reset();
    },
    complete: () => {
      console.log('complete');

    }
  });
}

public deleteAppointmentPuit(id: any){
  console.log('id',id);
  /* this.agendaService.deleteAgenda(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAgendsPuit();

        
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        this.getPuits();
        console.log('complete');
        }
    });*/

    console.log('id of puit deleted',id);
    console.log(this.editPuit);
  
    // Check if "agendas" property exists and contains the value to remove
  if (this.editPuit?.Agenda ) {
    for (let index = 0; index < this.editPuit.Agenda.length; index++) {
    if(this.editPuit.Agenda[index] == id){
      console.log(this.editPuit.Agenda[index]._id);
      
      // Remove the element from the array
      this.editPuit.Agenda.splice(index, 1);
    }
      
    }
  
  
    console.log("the final"+this.editPuit);
  
    this.puitService.updatepuit(this.editPuit).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAgendsPuit();
    /*    this.agendaService.deleteAgenda(id).subscribe({
          next: (response: any) => {
            console.log(response);
          //  this.getAgendsPuit();        
            },
          error: (error: HttpErrorResponse) => {
              alert(error.message);
            },
          complete: () => {
            this.getPuits();
            console.log('complete');
            }
        });*/
        },
      error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      complete: () => {
        this.getPuits();
        console.log('complete');
        }
    });
  }
}


public onOpenModal2(mission:any, mode: string): void {

    
  const container = document.getElementById('main-container') ;
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
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
    console.log("test mission value", mission)

    
    this.editPompe = mission;
    this.pompeService.getpompe(mission).subscribe({
      next: (response: any) => {
        console.log(response);
        console.log( response.agendas);
        console.log( response.agendas.length);
        for (let index = 0; index < response.agendas.length; index++) {
          console.log(index);
          console.log(response.agendas[index]);
        this.agendaService.getagendasById(response.agendas[index]).subscribe({
          next: (response: Agenda) => {
            console.log(response);
            console.log("responseresponseresponseresponseresponseresponse");       
            if (!this.agendaofPompe) {
              // If the agenda is undefined, initialize it as an empty array
              this.agendaofPompe = [];
            }
         
        
            // Add the agenda item to the array
            this.agendaofPompe.push(response);     
            //this.agendaofPompe?.push(response) ;
            console.log("dd"+ this.agendaofPompe);    
            },
          error: (error: HttpErrorResponse) => {
              alert(error.message);
            },
          complete: () => {
            console.log('complete');
            }
        });
          // Function to clear (empty) the agenda
  
    this.agendaofPompe = undefined;
  
      }
       
       
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
      complete: () => {
        console.log('complete');
      }
    });
    //console.log("22222",this.deleteCommand._id)
    button.setAttribute('data-target', '#updatePompeMissionModal');

    
  }  


  if( mode == 'addNewPompe'){
    this.pompe = mission;

  }
  
  
  container!.appendChild(button);
  button.click();
}



public onAddPompeMission(addForm: NgForm): void {
console.log("addForm.valueaddForm.valueaddForm.value")
  console.log(addForm.value)


  this.pompeService.addpompe(addForm.value).subscribe({
    next: (response: any) => {
      console.log(response);
      this.getPompes();
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

public onUpdatePompe(editForm: NgForm) : void{

  console.log("editForm.value._ideditForm.value._ideditForm.value._id")
  console.log(editForm.value._id)

    this.pompeService.updatepompe(editForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getPompes();
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

onDeletePompeMission(id : any){
  console.log('id',id);

  this.pompeService.deletepompe(id).subscribe({
    next: (response: any) => {
      console.log(response);

      
      },
    error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    complete: () => {
      this.getPompes();
      console.log('complete');
      }
  });
  

}

public addNewAppointmenPompe(addPlanifierPompeForm: NgForm){
  console.log(addPlanifierPompeForm.value)
  console.log("this.pompe"+this.pompe._id)

  this.agendaService.addAgenda({
    'date_debut': addPlanifierPompeForm.value.date_debut,
    'date_fin': addPlanifierPompeForm.value.date_fin,
    'pompe': this.pompe._id,
    'type': 'pompe'
  }).subscribe({
    next: (response: any) => {
     var newAgenda = response.id;
      console.log(response.id);
      this.pompeService.getpompe(this.pompe).subscribe({
        next: (response: any) => {
          console.log("pompe reson"+response.agendas);
     // Assuming response.agendas is initially an array
        response.agendas.push(newAgenda);
        console.log("response.agenda"+response.agendas);
        console.log("newAgendan"+newAgenda);

        this.pompeService.updatepompe(response).subscribe({
          next: (response: any) => {
            console.log(response);
      
            
            },
          error: (error: HttpErrorResponse) => {
              alert(error.message);
            },
          complete: () => {
          // this.getAgendaOfPompe(this.editPompe);
            console.log('complete');
            }
        });

          },
        error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        complete: () => {
        // this.getAgendaOfPompe(this.editPompe);
          console.log('complete');
          }
      });
  
   //   this.getAgendsPompe();
      addPlanifierPompeForm.reset();
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
      addPlanifierPompeForm.reset();
    },
    complete: () => {
      console.log('complete');

    }
  });
}

public refreshPompeAgenda(id: any){
  console.log('id of agenda',id);
}
public deleteAppointmentPompe(id: any){
  console.log('id of pompe delted',id);
  console.log(this.editPompe);

  // Check if "agendas" property exists and contains the value to remove
if (this.editPompe?.agendas ) {
  for (let index = 0; index < this.editPompe.agendas.length; index++) {
  if(this.editPompe.agendas[index] == id){
    console.log(this.editPompe.agendas[index]._id);
    // Remove the element from the array
    this.editPompe.agendas.splice(index, 1);
  }
  }


  console.log("the final"+this.editPompe);

  this.pompeService.updatepompe(this.editPompe).subscribe({
    next: (response: any) => {
      console.log(response);
      this.getAgendaOfPompe(this.editPompe);
    this.agendaService.deleteAgenda(id).subscribe({
        next: (response: any) => {
          console.log(response);
        this.getAgendsPompe();
  
          
          },
        error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        complete: () => {
          this.getPompes();
          console.log('complete');
          }
      });
      },
    error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    complete: () => {
      this.getPompes();
      
      console.log('complete');
      }
  });
}
}

public getAgendaOfPompe(mission: any){
  console.log(mission);
  this.pompeService.getpompe(mission).subscribe({
    next: (response: any) => {
      console.log(response);
      console.log(response.agendas);
      console.log(response.agendas.length);
      for (let index = 0; index < response.agendas.length; index++) {
        console.log(index);
        console.log(response.agendas[index]);
      this.agendaService.getagendasById(response.agendas[index]).subscribe({
        next: (response: Agenda) => {
          console.log(response);
          console.log("responseresponseresponseresponseresponseresponse");       
          if (!this.agendaofPompe) {
            this.agendaofPompe = [];
          }
          this.agendaofPompe.push(response);     
          //this.agendaofPompe?.push(response) ;
          console.log("dd"+ this.agendaofPompe);    
          },
        error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        complete: () => {
          console.log('complete');
          }
      });
      this.agendaofPompe = undefined;

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

updatePompeStatus(pompe: any) {
  console.log(pompe);
  console.log(pompe.active);
  pompe.active = !pompe.active;
  console.log(pompe);
  if( pompe.active) {
    var typeAction = "Active pompe"
  }else {
    var typeAction = "Stop pompe"
  } 
  // Call the service method to update the pump status
  this.pompeService.updatepompe(pompe).subscribe({
    next: (response: any) => {
      console.log('Pump status updated successfully:', response);
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
      console.error('Error updating pump status:', error);
    }
  });
}

updatePuitStatus(puit: any) {
  console.log("puit");
  console.log(puit);
  puit.Active = !puit.Active;
  console.log(puit);

  if( puit.Active) {
    var typeAction = "Active puit"
  }else {
    var typeAction = "Stop puit"
  }  // Call the service method to update the pump status
  this.puitService.updatepuit(puit).subscribe({
    next: (response: any) => {
      console.log('Pump status updated successfully:', response);
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
      console.error('Error updating pump status:', error);
    }
  });
}

updatePuitSecurity(puit: any) {
  console.log("puit");
  console.log(puit);
  if(puit.Security == "Yes"){
    puit.Security = "No"
    puit.Alert = "No"
  }else{
    puit.Security = "Yes"
    puit.Alert = "Yes"
  }

  console.log(puit);

  // Call the service method to update the pump status
  this.puitService.updatepuit(puit).subscribe({
    next: (response: any) => {
      console.log('Pump status updated successfully:', response);
    },
    error: (error: any) => {
      console.error('Error updating pump status:', error);
    }
  });
}

isStartDatePassed(startDate: string | undefined): boolean {
  if (!startDate || startDate.trim() === '') {
    // Handle undefined or empty strings
    return false;
  }

  const currentDate = new Date();
  const startDateObject = new Date(startDate);

  return currentDate.getTime() >= startDateObject.getTime();
}


async changeTheStatusOfPuit(){


 /* this.pompeService.getpompe(mission).subscribe({
    next: (response: any) => {
      console.log(response);
      console.log( response.agendas);
      console.log( response.agendas.length);
      for (let index = 0; index < response.agendas.length; index++) {
        console.log(index);
        console.log(response.agendas[index]);
      this.agendaService.getagendasById(response.agendas[index]).subscribe({
        next: (response: Agenda) => {
          console.log(response);
          console.log("responseresponseresponseresponseresponseresponse");       
          if (!this.agendaofPompe) {
            // If the agenda is undefined, initialize it as an empty array
            this.agendaofPompe = [];
          }
       
      
          // Add the agenda item to the array
          this.agendaofPompe.push(response);     
          //this.agendaofPompe?.push(response) ;
          console.log("dd"+ this.agendaofPompe);    
          },
        error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        complete: () => {
          console.log('complete');
          }
      });
        // Function to clear (empty) the agenda

  this.agendaofPompe = undefined;

    }
     
     
    },
    error: (error: HttpErrorResponse) => {
      alert(error.message);
    },
    complete: () => {
      console.log('complete');
    }
  });*/
}

}
