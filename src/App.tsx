import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { PersonDetailPage } from "./pages/personDetail";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route exact path="/person/:personId">
          <PersonDetailPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
