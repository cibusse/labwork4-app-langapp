import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import '/src/pages/intro_bienvenidos_ES.mp3';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tutorials</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      
        <IonCard color="dark">
          <IonCardHeader>
            <IonCardTitle>Intro</IonCardTitle>
            <IonCardSubtitle>Listening comprehension</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <audio src="/src/pages/intro_bienvenidos_ES.mp3" controls></audio>
          </IonCardContent>

          <IonCardContent>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/Ge4q7ZQpznA?si=-kfBLco0X6jC1jRW" title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </IonCardContent>
          
          <IonCardContent>
            <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat".
            </p>
          </IonCardContent>

          <IonCardContent><IonImg src="/src/pages/student.jpg"/></IonCardContent>

          </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
