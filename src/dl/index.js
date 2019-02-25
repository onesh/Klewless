import React from "react";
import { inject, observer } from "mobx-react";
import { Card, Button, Grid, Modal } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../app.header";
import Style from "./style.css";

@inject("DL")
@observer
class DL extends React.Component {
  constructor(props) {
    super(props);
    this.active_index = 0;
  }
  sendDlData(cb) {
    cb(this.active_index);
  }

  setDlName(activeDl, e) {
    let { value } = e.target;
    activeDl.name = value;
  }
  setDlValues(activeDl, e) {
    let { value } = e.target;
    activeDl.values = value;
  }

  setActiveIndexAndReadDl(cb, context, id, index) {
    cb.bind(context, id)();
    this.active_index = index;
  }

  render() {
    const {
      isLoading,
      readDl,
      dl,
      mode,
      setMode,
      updateDl,
      deleteDl,
      activeDl,
      createDl
    } = this.props.DL;
    console.log(dl);
    this.mode = mode;
    let that = this;
    let { setActiveIndexAndReadDl } = that;
    const { classes } = this.props;
    if (!isLoading) {
      return (
        <div>
          <Header />
          <div>
            <Grid container>
              <Grid className={"decorate-border-right"} item xs={12} md={3}>
                <div>
                  <Button onClick={createDl.bind(this.props.DL)}>
                    Create DL
                  </Button>
                </div>
                {dl.length > 0 ? (
                  dl.map((dl, index) => (
                    <div
                      onClick={setActiveIndexAndReadDl.bind(
                        that,
                        readDl,
                        this.props.DL,
                        dl._id,
                        index
                      )}
                    >
                      <Grid
                        container
                        className={
                          activeDl && activeDl._id == dl._id
                            ? "active"
                            : "testwrapper"
                        }
                      >
                        <Grid item xs={8} md={8}>
                          <span>{dl.name}</span>
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <span>{dl.count}</span>
                        </Grid>
                        <br />
                        <Grid item xs={8} md={8}>
                          <span>{dl.updated.toString()}</span>
                        </Grid>
                        <Grid item xs={4} md={4}>
                          <span>{dl.createdby}</span>
                        </Grid>
                      </Grid>
                      <br />
                    </div>
                  ))
                ) : (
                  <p>No DL list to populate</p>
                )}
              </Grid>
              {activeDl && activeDl._id ? (
                <div>
                  <div>
                    <Button onClick={setMode.bind(this.props.DL, "copypaste")}>
                      Copy-paste values
                    </Button>
                    <Button onClick={setMode.bind(this.props.DL, "upload")}>
                      Upload file
                    </Button>
                  </div>
                  <div>
                    <Grid item xs={12} md={12}>
                      <label>
                        Name
                        <input
                          onChange={this.setDlName.bind(this, activeDl)}
                          name="dl_name"
                          type="textarea"
                          value={activeDl.name}
                        />
                      </label>
                    </Grid>
                    {mode == "upload" ? (
                      <div>
                        <input type="file" />
                      </div>
                    ) : (
                      <Grid item xs={12} md={9}>
                        <Grid item xs={12} md={12}>
                          <label for="dl_values">
                            Values
                            <textarea
                              rows="4"
                              cols="50"
                              onChange={this.setDlValues.bind(this, activeDl)}
                              rows="20"
                              name="dl_values"
                              type="textarea"
                              value={activeDl.values}
                            />
                          </label>
                        </Grid>
                      </Grid>
                    )}
                  </div>
                  <div>
                    <Button
                      onClick={this.sendDlData.bind(
                        this,
                        updateDl.bind(this.props.DL, activeDl)
                      )}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={deleteDl.bind(
                        this.props.DL,
                        dl[this.active_index]
                          ? dl[this.active_index]._id
                          : null,
                        this
                      )}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ) : (
                <span>No DL selected</span>
              )}
            </Grid>
          </div>
        </div>
      );
    } else {
      readDl.bind(this.props.DL)();
      return <Header />;
    }
  }
}

export default DL;
