import React from "react";
import Textbox from "../core/components/textbox";
import style from "./style.css";
import { Card, Icon, Button, Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import Header from "../app.header";

@inject("GiveTest")
@observer
class GiveTest extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    const { isTestLoaded, test, loadTest } = this.props.GiveTest;
    const storePropRef = this.props.GiveTest;
    if (isTestLoaded) {
      return (
        <div>
          <Header execution={true} />
          <Grid container>
            <Grid item xs={10} md={10}>
              <Card>
                <div>{test.questions}</div>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      loadTest.bind(storePropRef, this.props.match.params.id)();
      return <Header />;
    }
  }
}

export default GiveTest;
