import React from 'react';
import Textbox from '../../textbox';
import { inject, observer } from 'mobx-react';
import { Card, Icon, Grid, Button } from '@material-ui/core';


export default class DichotomousQuestion extends React.Component {

  constructor (props) {
    super (props);
  }

  popQuestion (id) {
    this.props.deletequestion(id);
  }

  saveQuestion (id) {
    debugger;
    this.props.saveQuestion (id);
  }

  editModeToggler (store)  {
    store.editable = !store.editable;
    this.forceUpdate();
  }


  render() {
    const id = this.props.store.question._id;
    const { classes, deletequestion, saveQuestion } = this.props;
    const { editable } = this.props.store.store;
    const { question, name, options } = this.props.store.store.model;
    console.log(question, name, options);

    return (
      <Card style={{ margin: 10}}>


        <div class={'question-container'}>


          <Grid container spacing={10}>


            <Grid item xs={4} md={4}>


              Edit mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={editable ? 'checked' : ''} value={editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
            Priview mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={!editable ? 'checked' : ''} value={!editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
        </Grid>


        <br/>

        <br/>


        <Grid item xs={8} md={8}>


        </Grid>


      </Grid>


      <div>


        <Textbox
          block={true}
          model={question}
          editable={editable}
          style={
            {
              'margin-bottom': 10
            }
          }
          placeholder = {'Click and type question here..    '}
          >


        </Textbox>


      </div>



      <div>


        <div style={{ display: 'flex'}}>


          <input
            name="dichotomous"
            style={{'margin-right': 10}}
            type={'radio'}
            value={0}  />



          <Textbox
            model={options[0]}
            editable={editable}
            block={true}
            style={
              {
                width: 155,
              }
            }

            >



          </Textbox>


        </div>


        <div style={{ display: 'flex'}}>



          <input
            name="dichotomous"
            style={{'margin-right': 10}}
            type={'radio'}
            value={1} />


          <Textbox
            model={options[1]}
            block={true}
            editable={editable}
            style={
              {
                width: 155,
              }
            }

            >



          </Textbox>



        </div>


      </div>

      <div style={{'margin': 10, float: 'right'}}>


        {

          editable ? (
            <span>


              <Button
                style={{cursor: 'pointer'}}
                onClick={this.popQuestion.bind(this, id)}
                title={'delete question'}
                color="primary">
                Delete
              </Button>

              <Button
                style={{cursor: 'pointer'}}
                onClick={this.saveQuestion.bind(this, id)}
                title={'delete question'}
                color="primary">
                Save
              </Button>



            </span>
          ) : null
        }

      </div>


    </div>


  </Card>
);
}
}
