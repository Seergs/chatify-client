import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/general" component={Chat} />
          <Route path="/" component={Join} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
