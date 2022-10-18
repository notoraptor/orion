import React, { Component } from 'react';
import { Content } from 'carbon-components-react';
import TutorialHeader from './components/TutorialHeader';
import ExperimentNavBar from './components/ExperimentNavBar';
import LandingPage from './content/LandingPage';
import StatusPage from './content/StatusPage';
import VisualizationsPage from './content/VisualizationsPage';
import DatabasePage from './content/DatabasePage';
import ConfigurationPage from './content/ConfigurationPage';
import { BackendContext } from './BackendContext';
import { Backend, DEFAULT_BACKEND } from '../utils/queryServer';
import { withRouter } from 'react-router-dom';

class Experiments extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    // Store selected experiment here
    this.state = { experiments: null, experiment: null };
    this.onSelectExperiment = this.onSelectExperiment.bind(this);
  }
  render() {
    return (
      <>
        <BackendContext.Provider
          value={{
            address: DEFAULT_BACKEND,
            // Pass selected experiment as React context
            // so that it is available in route components
            experiment: this.state.experiment,
          }}>
          <TutorialHeader
            dashboard="experiments"
            experiments={this.state.experiments}
          />
          <ExperimentNavBar
            experiment={this.state.experiment}
            experiments={this.state.experiments}
            onSelectExperiment={this.onSelectExperiment}
          />
          <Content>{this.renderPage()}</Content>
        </BackendContext.Provider>
      </>
    );
  }
  componentDidMount() {
    this._isMounted = true;
    const backend = new Backend(DEFAULT_BACKEND);
    backend
      .query('experiments')
      .then(results => {
        const experiments = results.map(experiment => experiment.name);
        experiments.sort();
        if (this._isMounted) {
          this.setState({ experiments });
        }
      })
      .catch(error => {
        if (this._isMounted) {
          this.setState({ experiments: [] });
        }
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  renderPage() {
    switch (this.props.match.params.page || 'landing') {
      case 'landing':
        return <LandingPage />;
      case 'status':
        return <StatusPage />;
      case 'visualizations':
        return <VisualizationsPage />;
      case 'database':
        return <DatabasePage />;
      case 'configuration':
        return <ConfigurationPage />;
      default:
        break;
    }
  }
  onSelectExperiment(experiment) {
    this.setState({ experiment });
  }
}

export const ExperimentsWithRouter = withRouter(Experiments);
