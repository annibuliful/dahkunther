import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HomePage } from "./pages/home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
