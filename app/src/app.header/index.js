import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { inject, observer } from "mobx-react";
import { RecordVoiceOver } from '@material-ui/icons';

import {
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  MenuIcon,
  Paper,
  Card
} from "@material-ui/core";

@inject("UserStore")
@observer
class Header extends React.Component {
  render() {
    const { user, logout } = this.props.UserStore;
    const { classes, execution } = this.props;
    return (
      <div>
        <Grid container spacing={10}>
          <Grid item xs={12} md={12}>
            <AppBar position="static">
              <Toolbar>
                <Grid item xs={6} md={6}>
                  <Typography variant="title" color="inherit">
                    <RecordVoiceOver/> Voiceoc
                  </Typography>
                </Grid>
                <Grid item xs={0} md={4} />
                <Grid item xs={0} md={2}>
                  <p>{!user ? "" : user.email}</p>
                </Grid>
                <Grid item xs={6} md={1}>
                  {user.email ? (
                    <Button onClick={logout} color="inherit">
                      Logout
                    </Button>
                  ) : (
                    <span />
                  )}
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
        <br />
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Header;
