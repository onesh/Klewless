import React from 'react';
import { Button, Card, Paper, TextField, Grid } from '@material-ui/core';


class Textbox extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      invalid: false
      };

  }

  mouseEnter (e) {
    let  { value } = e.target;


   }

  mouseLeave (e) {
    let  { value } = e.target;


  }

  setName (e) {
    this.name = e.target.value;
    console.log(this);
  }

  setAutoPublish (meta, e) {
    meta.autoPublish = !meta.autoPublish;
    this.forceUpdate();
  }

  getModalStyle () {
    return {
      modalPosition: {
        position: 'absolute',
        top: '25%',
        left: '35%',
        padding: 30,
        'padding-bottom': 10,
        width: 'min-content'
      },
      margin: {
        margin: 2,
        'white-space': 'nowrap'
      },
      nowrap: {
        'white-space': 'nowrap'
      },
      marginRight : {
        'margin-right': 26
      }
    }
  }

  saveTestMeta (test, resolve, context) {
      let isValid = Object.keys(this).filter( (ele, index) => this[ele].toString().length > 0).length == Object.keys(this).length ? true : false;
      if (isValid) resolve(test);
      else {
        context.setState({
          invalid: true
        });
      }
  }
  cancelModal (test, reject, context) {
    context.setState({
      invalid: false
    });
    reject();
  }

render() {
    let { meta } = this.props.test;
    const { name, startDate, expiryDate, publishDate,
            autoPublish, active, location, duration } = meta;
            const { classes, resolve, reject } = this.props;

return (
<Card style={this.getModalStyle().modalPosition}>
    <form noValidate>
      <Grid container spacing={10}>
          <table>
            <tr>
              <Grid item xs={12} md={12} style={this.getModalStyle().nowrap}>
              <td>
                <label for={'autoPublish'} style={this.getModalStyle().marginRight}> Test Name</label>
              </td>
              <td>
                <input placeholder={'Test name'} type='text' onChange={this.setName.bind(meta)} />
              </td>
            </Grid>
            </tr>
            <tr>
              <Grid item xs={12} md={12} style={this.getModalStyle().margin}>
              <td>
                <label for={'autoPublish'} style={this.getModalStyle().marginRight}> Start date</label>
              </td>
              <td>
                <TextField
                  id={"start-Date"}
                  name={"start-Date"}
                  type="datetime-local"
                  defaultValue={startDate.toISOString().slice(0,-1)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </td>
            </Grid>
            </tr>
            <tr>
              <Grid item xs={12} md={12} style={this.getModalStyle().margin}>
              <td>
                <label for={'autoPublish'} style={this.getModalStyle().marginRight}> Auto publish</label>
              </td>
              <td>
                Yes <input type={'radio'} name={'autoPublish'} checked={autoPublish == true ? 'checked' : '' } onChange={this.setAutoPublish.bind(this, meta)} />
              No <input type={'radio'} name={'autoPublish'}  checked={autoPublish == false ? 'checked' : '' } onChange={this.setAutoPublish.bind(this, meta)} />
              {
                autoPublish == true ?
              <TextField
                id={"publish-Date"}
                name={"publish-Date"}
                type="datetime-local"
                defaultValue={publishDate.toISOString().slice(0,-1)}
                InputLabelProps={{
                  shrink: true,
                }}
                /> : []
              }
              </td>
            </Grid>
            </tr>
            <tr>
              <Grid item xs={12} md={12} style={this.getModalStyle().margin}>
              <td>
                <label for={'autoPublish'} style={this.getModalStyle().marginRight}> Expiry Date</label>
              </td>
              <td>
                <TextField
                  id={"end-Date"}
                  name={"end-Date"}
                  type="datetime-local"
                  defaultValue={expiryDate.toISOString().slice(0,-1)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </td>
            </Grid>
            </tr>
        </table>
        {
          this.state.invalid ?  (<p>Please fill all the fields to save</p>) : (<span></span>)
        }
      </Grid>
      <Button style={{'margin-top': 10, float: 'right'}} color="primary" onClick={this.cancelModal.bind(meta, this.props.test, reject, this)}>Cancel</Button>
      <Button style={{'margin-top': 10, float: 'right'}} color="primary" onClick={this.saveTestMeta.bind(meta, this.props.test, resolve, this)}>Save</Button>
    </form>
  </Card>
  )
  }
 }

export default Textbox;
