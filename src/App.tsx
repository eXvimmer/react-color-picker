import { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import NewPaletteForm from "./components/NewPaletteForm";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import { LOCAL_STORAGE_NAME } from "./constants";
import { generatePalette } from "./utils/colorHelpers";
import seedColors, { IPalette } from "./utils/seedColors";
import Page from "./components/Page";
import NotFound from "./components/NotFound";

interface AppState {
  palettes: IPalette[];
}

class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);

    const localPalettes = localStorage.getItem(LOCAL_STORAGE_NAME);
    this.state = {
      palettes: localPalettes ? JSON.parse(localPalettes) : seedColors,
    };

    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id: string) {
    return this.state.palettes.find(palette => palette.id === id);
  }

  savePalette(newPalette: IPalette) {
    this.setState(
      {
        palettes: [...this.state.palettes, newPalette],
      },
      this.syncLocalStorage
    );
  }

  /** Save palettes to local storage */
  syncLocalStorage() {
    localStorage.setItem(
      LOCAL_STORAGE_NAME,
      JSON.stringify(this.state.palettes)
    );
  }

  deletePalette(id: string) {
    this.setState(st => {
      return {
        palettes: st.palettes.filter(palette => palette.id !== id),
      };
    }, this.syncLocalStorage);
  }

  render() {
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        {...routeProps}
                        deletePalette={this.deletePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        palettes={this.state.palettes}
                        savePalette={this.savePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        colorId={routeProps.match.params.colorId}
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                      />
                    </Page>
                  )}
                />

                <Route
                  render={() => (
                    <Page>
                      <NotFound />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
