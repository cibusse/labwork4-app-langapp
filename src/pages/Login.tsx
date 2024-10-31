import React, { useRef, useState, FormEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonAlert } from '@ionic/react';
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!emailRef.current || !emailRef.current.value || !passwordRef.current || !passwordRef.current.value) {
      return setError("Please enter your email and password");
    }

    try {
      setError("");
      setLoading(true);
      const email = emailRef.current.value.toString();
      const password = passwordRef.current.value.toString();
      await login(email, password);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonAlert isOpen={!!error} message={error} buttons={['OK']} onDidDismiss={() => setError('')} />}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" ref={emailRef} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" ref={passwordRef} required />
          </IonItem>
          <IonButton disabled={loading} expand="block" type="submit" className="ion-margin-top">
            Log In
          </IonButton>
        </form>
        <div className="ion-text-center ion-margin-top">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
