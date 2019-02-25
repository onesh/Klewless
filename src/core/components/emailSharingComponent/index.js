import React from "react";
import {
  Card,
  Button,
  Grid,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormHelperText,
  FormControl
} from "@material-ui/core";

class EmailSharingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.selectedDl = "";
  }
  setSelectedDl(e) {
    this.selectedDl = e.target.value;
    this.forceUpdate();
  }
  setCustomEmails(e) {
    this.customEmails = e.target.value;
  }
  onSave(cb, testID) {
    cb(this.selectedDl, this.customEmails, testID)
      .then(() => {})
      .catch(err => {
        this.err = err;
        this.forceUpdate();
      });
  }
  render() {
    const { dls, onSave, classes, testID } = this.props;
    return (
      <div>
        <div>
          <InputLabel htmlFor="Dl-list-selector">
            Choose this Dl to send this test link &nbsp;
          </InputLabel>
          <Select
            value={this.selectedDl}
            onChange={this.setSelectedDl.bind(this)}
            inputProps={{
              name: "DL-list-selector",
              id: "Dl-list-selector"
            }}
          >
            {dls.map(dl => (
              <MenuItem value={dl._id}>{dl.name}</MenuItem>
            ))}
          </Select>
          <FormHelperText>from existing Dls</FormHelperText>
        </div>
        <p>or/also</p>
        <div>
          <TextField
            id="manual-email-for-sharing-test"
            label="Enter emails manually"
            multiline
            style={{ width: 400 }}
            rows="4"
            cols="20"
            defaultValue=""
            margin="normal"
            onChange={this.setCustomEmails.bind(this)}
          />
        </div>

        <Button onClick={this.onSave.bind(this, onSave, testID)}>Share</Button>
        <p style={{ color: "blue" }}>{this.err ? this.err.message : ""}</p>
      </div>
    );
  }
}

export default EmailSharingComponent;
