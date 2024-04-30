import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Database, object, ref } from '@angular/fire/database';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  valores_db:any
  color: string = 'blank';
  constructor(private database:Database) {
  }
  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    const route = ref(this.database, "/Casa/Luz");
    object(route).subscribe(async attributes => {
      //Se obtiene el valor
      this.valores_db= attributes.snapshot.val();
      //Si el valor es verdadero si da un color  ala variable del color dependiendo el caso y si es falso el mismo proceso
      if (this.valores_db === true) {
        await LocalNotifications.schedule({//Elaboracion del objeto notificacion
          notifications: [
            {
              title: "Esta es una notificación muestra que es de dia",
              body: "Se esta viendo que es de dia por medio de la luz",
              id: 1
            }
          ]
        });
        this.color = '#FFFFFF'; 
      
        
      }else{
        await LocalNotifications.schedule({//Elaboracion del objeto notificacion
          notifications: [
            {
              title: "Esta es una notificación muestra que es de noche",
              body: "Esta notificación muestra que ya es hora de dormir osea bye",
              id: 1,schedule:{
                allowWhileIdle:true// Permite que la notificación se ejecute incluso durante el modo Reposo
              }
            }
          ]
        });
        this.color = '#000000'; 
      
      }
      
      
    });
    
    
    
    
     }

}
