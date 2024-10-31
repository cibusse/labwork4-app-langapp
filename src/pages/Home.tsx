import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { homeOutline, reorderThreeOutline, apertureOutline, handRightOutline } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonApp>
      <IonMenu contentId="main-content">
        <IonHeader>
            <IonToolbar>
                <IonTitle>Menu</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonList>            
                <IonListHeader>
                    <IonLabel> Navigate from here...</IonLabel>
             </IonListHeader>
            <IonMenuToggle autoHide>
            <IonItem button routerLink="/Welcome">
                <IonIcon slot="start" icon={handRightOutline}></IonIcon>
                    <IonLabel>Welcome</IonLabel>
                </IonItem>
                <IonItem button routerLink="/Home">
                    <IonIcon slot="start" icon={homeOutline}></IonIcon>
                    <IonLabel>Home</IonLabel>
                </IonItem>

                <IonItem button routerLink="/Login">
                <IonIcon slot="start" icon={handRightOutline}></IonIcon>
                    <IonLabel>Login</IonLabel>
                </IonItem>

            </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>

    <IonPage id="main-content">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuToggle>
                        <IonButton>
                            <IonIcon slot="start" icon={reorderThreeOutline}></IonIcon>
                        </IonButton>
                    </IonMenuToggle>
                </IonButtons>
                <IonTitle>Header</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <h1>Learn Spanish!</h1>
            <p>You can find free tutorials on this app.</p>
        </IonContent>
    </IonPage>
    </IonApp>
  );
};

export default Home;



