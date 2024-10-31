import React, { useRef, useState, FormEvent } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonAlert, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const UpdateProfile: React.FC = () => {
  const emailRef = useRef<HTMLIonInputElement>(null);
  const passwordRef = useRef<HTMLIonInputElement>(null);
  const passwordConfirmRef = useRef<HTMLIonInputElement>(null);
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    const promises: Promise<void>[] = [];
    setLoading(true);
    setError("");

    const email = emailRef.current?.value?.toString() || "";
    const password = passwordRef.current?.value?.toString() || "";

    if (email !== currentUser?.email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/"); // Redirect after updating
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {error && <IonAlert isOpen={!!error} message={error} buttons={['OK']} onDidDismiss={() => setError('')} />}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle className="ion-text-center">Update Profile</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput type="email" ref={emailRef} required value={currentUser?.email || ""} />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password Confirmation</IonLabel>
                <IonInput type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
              </IonItem>
              <IonButton disabled={loading} expand="block" type="submit" className="ion-margin-top">
                Update
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
        <div className="ion-text-center ion-margin-top">
          <Link to="/">Cancel</Link>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UpdateProfile;
