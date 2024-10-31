import React, { useRef, useState, FormEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

const Signup: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const passwordConfirmRef = useRef<HTMLIonInputElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const email = emailRef.current?.value as string;
      const password = passwordRef.current?.value as string;
      await signup(email, password);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonAlert isOpen={!!error} message={error} buttons={['OK']} onDidDismiss={() => setError('')} />}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">Sign Up</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" ref={emailRef} required />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" ref={passwordRef} required />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password Confirmation</IonLabel>
                <IonInput type="password" ref={passwordConfirmRef} required />
              </IonItem>
              <IonButton disabled={loading} expand="block" type="submit" className="ion-margin-top">
                Sign Up
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
        <div className="ion-text-center ion-margin-top">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Signup;

