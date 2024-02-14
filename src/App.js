import React from 'react';
import { withAuthenticator, Button, View } from "@aws-amplify/ui-react";
import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import './App.css';
import RegisterVisitor from "./components/listgroup.tsx";



function App({ signOut }) {
  return (
    <View className="App">
      
      <RegisterVisitor />
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}

export default withAuthenticator(App);
