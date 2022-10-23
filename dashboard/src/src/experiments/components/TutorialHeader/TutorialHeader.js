import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderMenu,
  HeaderNavigation,
  HeaderMenuButton,
  HeaderMenuItem,
  SkipToContent,
  Modal,
  ButtonSet,
  Grid,
  Row,
  Column,
  Button,
  Form,
  FormGroup,
  FileUploader,
} from 'carbon-components-react';
import { Link } from 'react-router-dom';
import { DEFAULT_BACKEND } from '../../../utils/queryServer';
import { ModalStateManager } from '../ModalStateManager';

// Props: dashboard: str, experiments: [str]
const TutorialHeader = props => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <Header aria-label="Orion Dashboard">
        <SkipToContent />
        <HeaderMenuButton
          aria-label="Open menu"
          onClick={onClickSideNavExpand}
          isActive={isSideNavExpanded}
        />
        <HeaderName element={Link} to="/" prefix="Oríon" replace>
          Dashboard
        </HeaderName>
        <HeaderNavigation aria-label="Oríon Dashboard">
          <HeaderMenu
            aria-label={
              props.dashboard === 'experiments'
                ? 'experiments (selected)'
                : 'experiments'
            }
            menuLinkName="Experiments">
            <HeaderMenuItem
              title="Go to experiments visualizations"
              element={Link}
              to="/visualizations"
              replace>
              Visualizations
            </HeaderMenuItem>
            <HeaderMenuItem
              title="Go to experiments status"
              element={Link}
              to="/status"
              replace>
              Status
            </HeaderMenuItem>
            <HeaderMenuItem
              title="Go to experiments database"
              element={Link}
              to="/database"
              replace>
              Database
            </HeaderMenuItem>
            <HeaderMenuItem
              title="Go to experiments configuration"
              element={Link}
              to="/configuration"
              replace>
              Configuration
            </HeaderMenuItem>
            <HeaderMenuItem
              href={`${DEFAULT_BACKEND}/dump`}
              target="_blank"
              title="Export database">
              Export database
            </HeaderMenuItem>
            {props.experiments ? (
              <HeaderMenuItem title="Export experiment ...">
                <ModalStateManager
                  renderLauncher={({ setOpen }) => (
                    <span className="span-link" onClick={() => setOpen(true)}>
                      Export experiment ...
                    </span>
                  )}>
                  {({ open, setOpen }) => (
                    <Modal
                      modalLabel="Export experiment"
                      modalHeading="Select experiment to export"
                      passiveModal={true}
                      open={open}
                      onRequestClose={() => setOpen(false)}>
                      <ButtonSet stacked={true}>
                        {props.experiments.map((experiment, expIndex) => (
                          <Button
                            key={expIndex}
                            className="button-export-experiment"
                            kind="secondary"
                            onClick={() => {
                              window.open(
                                `${DEFAULT_BACKEND}/dump?name=${experiment}`,
                                '_blank'
                              );
                              setOpen(false);
                            }}>
                            {experiment}
                          </Button>
                        ))}
                      </ButtonSet>
                    </Modal>
                  )}
                </ModalStateManager>
              </HeaderMenuItem>
            ) : (
              ''
            )}
            {props.experiments ? (
              <HeaderMenuItem
                title="Import data"
                element={Link}
                to="/import"
                replace>
                Import data ...
              </HeaderMenuItem>
            ) : (
              ''
            )}
          </HeaderMenu>
          <HeaderMenu
            aria-label={
              props.dashboard === 'benchmarks'
                ? 'benchmarks (selected)'
                : 'benchmarks'
            }
            menuLinkName="Benchmarks">
            <HeaderMenuItem
              title="Go to benchmarks visualizations"
              element={Link}
              to="/benchmarks/visualizations"
              replace>
              Visualizations
            </HeaderMenuItem>
            <HeaderMenuItem
              title="Go to benchmarks status"
              element={Link}
              to="/benchmarks/status"
              replace>
              Status
            </HeaderMenuItem>
            <HeaderMenuItem
              title="Go to benchmarks database"
              element={Link}
              to="/benchmarks/database"
              replace>
              Database
            </HeaderMenuItem>
            <HeaderMenuItem
              title="Go to benchmarks configuration"
              element={Link}
              to="/benchmarks/configuration"
              replace>
              Configuration
            </HeaderMenuItem>
          </HeaderMenu>
        </HeaderNavigation>
      </Header>
    )}
  />
);

export default TutorialHeader;
