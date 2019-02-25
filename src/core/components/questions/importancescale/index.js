import React from 'react';
import Textbox from '../../textbox';
import { inject, observer } from 'mobx-react';
import { Card, Icon, Grid, Button } from '@material-ui/core';


export default class ImportanceScale extends React.Component {

  constructor (props) {
    super (props);
  }

  popQuestion (id) {
    this.props.deletequestion(id);
  }

  saveQuestion (id) {
    this.props.saveQuestion(id)
  }

  editModeToggler (store)  {
    store.editable = !store.editable;
    this.forceUpdate();
  }

  render() {
    debugger;
    const { isLoading, logPropensity, propensity} = this.props.store;
    const { classes, deletequestion, saveQuestion } = this.props;
    const { question } = this.props.store.store.model;
    const id = this.props.store.question._id;
    const { editable } = this.props.store.store;

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

        <ol>

          {

            ['Extremely Important', 'Very important', 'Somewhat important', 'Not very important', 'Not at all important'].map((propens, index) => (
              <li
                style={{height: 20, width: 150,
                  'background-color': propensity == propens ? '#d7e0e8' : 'white',
                  'margin-top': 10,
                  cursor: 'pointer',
                  border: '1px solid lightgray',
                  'box-shadow': '1px 1px 2px'
                }}
                onClick={logPropensity.bind(this.props.store, index, this)}
                >
                {propens}
              </li>
            ))
          }
        </ol>

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
