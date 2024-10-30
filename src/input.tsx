import React, { FC } from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { Controller, Control } from "react-hook-form";

export interface InputProps {
  name: string;
  control?: Control;
  label?: string;
  component?: JSX.Element; // This is not necessary if you're using render prop
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
            {...field} // Spread field props to IonInput
            onIonChange={e => field.onChange(e.detail.value)} // Handle changes correctly
          />
        )}
      />
    </IonItem>
  );
};

export default Input;
