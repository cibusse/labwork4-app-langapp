import React, { FC } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { Controller, Control } from "react-hook-form";

export interface InputProps {
  name: string;
  control?: Control;
  label?: string;
  component?: JSX.Element; 
}

const Input: FC<InputProps> = ({
  name,
  control,
  label,
}) => {
  return (
    <IonItem>
      {label && (
        <IonLabel position="floating">{label}</IonLabel>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IonInput
            {...field} 
            onIonChange={e => field.onChange(e.detail.value)} 
          />
        )}
      />
    </IonItem>
  );
};

export default Input;
