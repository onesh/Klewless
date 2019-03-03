import React from "react";
import Textbox from "../core/components/textbox";
import style from "./style.css";
import { Card, Icon, Button, Grid } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import QuestionList from "../questionlist";
import Header from "../app.header";

@inject("Test")
@observer
class CreateTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const {components, getTestAndPopulateTest, toggleEditMode } = this.props.Test;
    const test = this.props.Test;
    const { isLoading, isPriview } = this.props.Test;

    if (isPriview) {
      toggleEditMode.bind(this.props.Test, true)();
    }

    if (!isLoading) {
      return (
        <div>
          <Header />
          <Grid container>
            <Grid item xs={10} md={10}>
              <Card>
                <div class={"container"}>
                  <Link
                    color="primary"
                    color="primary"
                    to={"/test/" + this.props.Test._id}
                    onClick={toggleEditMode.bind(this.props.Test, false)}
                  >
                    Priview Test
                  </Link>
                </div>
                <div>{components}</div>
              </Card>
            </Grid>
            <Grid item xs={2} md={2}>
              <QuestionList />
            </Grid>
          </Grid>
        </div>
      );
    } else {
      getTestAndPopulateTest.bind(
        this.props.Test,
        this.props.match.params.id,
        true
      )();
      return <Header />;
    }
  }
}

export default CreateTest;
