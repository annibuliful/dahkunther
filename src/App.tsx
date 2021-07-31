import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AddPersonPage } from "./pages/addPerson";
import { HomePage } from "./pages/home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route path="/add-person">
          <AddPersonPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
