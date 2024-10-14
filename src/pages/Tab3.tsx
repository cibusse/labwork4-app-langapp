import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { Controller, useForm } from 'react-hook-form';


const Tab3: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contact</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <IonCard color="dark">
        <IonCardContent>
          <form>
            <IonLabel>Leave us a message!</IonLabel>
            
  
            <IonInput placeholder='Write here'></IonInput>

 
            <IonButton type="submit" expand="block">Submit</IonButton>

          </form>
        </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};
export default Tab3;
