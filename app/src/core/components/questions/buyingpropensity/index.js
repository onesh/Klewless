import React from 'react';
import Textbox from '../../textbox';
import { inject, observer } from 'mobx-react';
import { Card, Icon, Grid, Button } from '@material-ui/core';

export default class BuyingPropensity extends React.Component {

  constructor (props) {
    super (props);
  }
  popQuestion (id) {
    this.props.deletequestion(id);
  }
  saveQuestion (id) {
    this.props.saveQuestion(id);
  }
  editModeToggler (store)  {
    store.editable = !store.editable;
    this.forceUpdate();
  }

  logPropensity (index, e) {
    this.props.model.logPropensity.call(this.props.model, index);
    this.forceUpdate();
  }

  render() {
    const { classes, deletequestion, saveQuestion } = this.props;
    const { editable } = this.props.store.store;
    const { isLoading, logPropensity, propensity} = this.props.store
    const{  question, options, name } = this.props.store.store.model;
    const id = this.props.store.question._id;



    return (
      <Card style={{ margin: 10}}>
        <div class={'question-container'}>
          <Grid container spacing={10}>
            <Grid item xs={4} md={4}>
              Edit mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={editable ? 'checked' : ''} value={editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
            Priview mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={!editable ? 'checked' : ''} value={!editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
        </Grid>
        <br/> <br/>
        <Grid item xs={8} md={8}>
          <div>
            {

              editable ? (
                <span>
                  <Button style={{cursor: 'pointer'}} onClick={this.popQuestion.bind(this, id)} title={'delete question'} color="primary">Delete Question</Button>
                </span> ) : null
              }

            </div>
          </Grid>
        </Grid>        <div>
        <Textbox block={true}
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

      <div >
        {
          ['Definately', 'Probably', 'Probably Not', 'Not Sure', 'Definately Not']
          .map((propens, index) => (<div style={{height: 100, width: 100,
            'background-color': propensity == propens ? '#d7e0e8' : 'aliceblue',
            'text-align': 'center',
            'border-radius': '50%',
            'position' : 'relative',
            display: 'inline-block',
            'margin-right': 10,
            cursor: 'pointer',
            border: '1px solid lightgray',
            'box-shadow': '1px 1px 4px'
          }}
          onClick={logPropensity.bind(this.props.store, this, index)}
          ><span
          style= {{
            'position': 'absolute',
            'top': '25%',
            'left': '18%'
          }}
          >{index + 1} <br/> {propens}</span>
      </div>))
    }
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
            title={'save question'}
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
