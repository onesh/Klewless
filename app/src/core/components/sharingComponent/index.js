import React from "react";
import styles from "./style.css";
import { inject, observer } from "mobx-react";
import { Card, Button, Grid, Modal, Select } from "@material-ui/core";

@inject("SharingComponentStore")
@observer
class SharingComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      setVisibility,
      isOpen,
      config,
      openChannel,
      activeChannel
    } = this.props.SharingComponentStore;
    if (!isOpen) {
      return <div />;
    } else if (isOpen) {
      return (
        <div>
          <div
            className={"sharing-component"}
            onClick={setVisibility.bind(
              this.props.SharingComponentStore,
              !isOpen
            )}
          >
            close &#9747;
          </div>
          <div>
            <div className={"sharing-testlink"}>{config.testLink}</div>
          </div>
          <Grid container spacing={10}>
            <Grid item xs={12} md={6}>
              <ul>
                {config.channels.map((channel, index) => (
                  <li>
                    <Button
                      className={
                        index == activeChannel.index
                          ? "sharing-tab-active"
                          : "sharing-tab"
                      }
                      onClick={openChannel.bind(
                        this.props.SharingComponentStore,
                        index
                      )}
                    >
                      {channel}
                    </Button>
                  </li>
                ))}
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={"sharing-channel-container"}>
                {[activeChannel.component]}
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}

export default SharingComponent;
