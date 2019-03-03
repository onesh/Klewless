import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Icon, Button, Grid, Modal, Paper } from "@material-ui/core";
import TestMeta from "../core/components/testmeta";
import { Link } from "react-router-dom";
import Header from "../app.header";
import Style from "./style.css";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

@inject("TestList", "Test", "UIStore")
@observer
class TestList extends React.Component {
  constructor(props) {
    super(props);
  }

  setTestlistAsLoading(cb) {
    this.isLoading = true;
    cb();
  }
  
  render() {
    const {
      testlist,
      addTest,
      createTest,
      activeTest,
      modal,
      closeModal,
      isLoading,
      getAllTest,
      sharingComponent,
      componentToBeShared,
      setSharingComponent,
      removeSharingComponent
    } = this.props.TestList;
    const { setTestReload } = this.props.Test;
    this.props.UIStore.scrollToView(".sharing-component");
    if (!isLoading) {
      return (
        <div>
          <Header />
          <Grid container spacing={10}>
            <Grid item xs={12} md={12}>
              <Card>
                <div>
                  <Button
                    color="primary"
                    onClick={createTest.bind(this.props.TestList)}
                  >
                    New Survey
                  </Button>
                  <Link color="primary" color="primary" to={"/dl/"}>
                    Manage DL
                  </Link>
                </div>
                <div>
                  {testlist.map((test, index) => {
                    return (
                      <div>
                        <div className={"testwrapper"}>
                          <List>
                            <Grid container spacing={10}>
                              <Grid item md={4}>
                                <ListItem>
                                  <ListItemText
                                    primary="Active"
                                    secondary={test.meta.active + ""}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Auto publish"
                                    secondary={test.meta.autoPublish + ""}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Created"
                                    secondary={new Date(
                                      test.created
                                    ).toGMTString()}
                                  />
                                </ListItem>
                              </Grid>
                              <Grid item md={4}>
                                <ListItem>
                                  <ListItemText
                                    primary="Response count"
                                    secondary={test.responseCount}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Question count"
                                    secondary={test.stores.length}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Duration"
                                    secondary={test.meta.duration}
                                  />
                                </ListItem>
                              </Grid>
                              <Grid item md={4}>
                                <ListItem>
                                  <ListItemText
                                    primary="TestLink"
                                    secondary={test.testLink}
                                  />
                                </ListItem>
                                <ListItem>
                                  <ListItemText
                                    primary="Last updated by"
                                    secondary={test.user.email}
                                  />
                                </ListItem>
                              </Grid>
                            </Grid>
                          </List>
                          <Button
                            href="#"
                            onClick={setSharingComponent.bind(
                              this.props.TestList,
                              index,
                              test
                            )}
                          >
                            share test
                          </Button>
                          &nbsp;
                          <Button
                            onClick={this.setTestlistAsLoading.bind(
                              this.props.TestList,
                              setTestReload.bind(this.props.Test, test._id)
                            )}
                          >
                            <Link
                              color="primary"
                              to={"/createtest/" + test._id}
                              style={{ "text-decoration": "none" }}
                            >
                              Edit Test
                            </Link>
                          </Button>
                        </div>

                        <div className={"sharing-component-holder"}>
                          {index == componentToBeShared ? (
                            <div class="body" >{[sharingComponent]}</div>
                          ) : (
                          <span/>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Grid>
            <Grid item xs={6} md={6}>
              <Modal open={modal.open} onBackdropClick={closeModal.bind(modal)}>
                <Card>{modal.component}</Card>
              </Modal>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      getAllTest.bind(this.props.TestList)();
      return <Header />;
    }
  }
}
export default withStyles(styles)(TestList);
