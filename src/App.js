  import React from 'react';
  import { withAuthenticator, Button, Heading, Image, View, Card } from "@aws-amplify/ui-react";
  import logo from "./logo.svg";
  import "@aws-amplify/ui-react/styles.css";
  import './App.css';


  function App({ signOut }) {
    return (
      <View className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Hello from V2</h1>
        </header>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
    );
  }

  
  export default withAuthenticator(App);
