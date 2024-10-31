import React, { useRef, useState, FormEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { useAuth } from "../contexts/AuthContext";
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const { resetPassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!emailRef.current || !emailRef.current.value) {
      return setError("Please enter your email");
    }

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value.toString());
      setMessage("Check your email for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Password Reset</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonAlert isOpen={!!error} message={error} buttons={['OK']} onDidDismiss={() => setError('')} />}
        {message && <IonAlert isOpen={!!message} message={message} buttons={['OK']} onDidDismiss={() => setMessage('')} />}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">Password Reset</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" ref={emailRef} required />
              </IonItem>
              <IonButton disabled={loading} expand="block" type="submit" className="ion-margin-top">
                Reset Password
              </IonButton>
            </form>
            <div className="ion-text-center ion-margin-top">
              <Link to="/login">Login</Link>
            </div>
          </IonCardContent>
        </IonCard>
        <div className="ion-text-center ion-margin-top">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;

