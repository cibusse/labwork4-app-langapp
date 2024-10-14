import { IonButton, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import '/src/pages/welcome_pic.png';
import { homeOutline, reorderThreeOutline, apertureOutline } from 'ionicons/icons';

const Welcome: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonImg src="/src/pages/welcome_pic.png"/>
      </IonContent>
    </IonPage>
  );
};
export default Welcome;
