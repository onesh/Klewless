import React from 'react';
import Textbox from '../../textbox';
import { inject, observer } from 'mobx-react';
import { Card, Icon, Button, Grid } from '@material-ui/core';
import cloner from '../../../services/clone.helper';
import  { model }  from './model';

export default class BipolarQuestion extends React.Component {

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
    const { classes, deletequestion, saveQuestion } = this.props;
    const { editable, showEditToggle } = this.props.store.store;
    const{  question, options } = this.props.store.store.model;
    const { addOption, removeOption } = this.props.store;
    const id = this.props.store.question._id;
    
    const { name } = question;

    return (
      <Card style={{ margin: 10}} >

        <div class={'question-container'}>

          <Grid container spacing={10}>
{showEditToggle ? (
        <Grid item xs={4} md={4}>
          Edit mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={editable ? 'checked' : ''} value={editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
          Priview mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={!editable ? 'checked' : ''} value={!editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
        </Grid>) : (<span/>)}
        

        <br/>
        <br/>

        <Grid item xs={8} md={8}>

          <div>

            {

              editable ? (
                <span>

                  <Button
                    style={{cursor: 'pointer'}}
                    onClick={addOption.bind(options, this)}
                    title={'add option'}
                    color="primary">
                    Add Option
                  </Button>

                  <Button
                    style={{cursor: 'pointer'}}
                    onClick={removeOption.bind(options , this)}
                    title={'remove option'}
                    color="primary">
                    Remove Option
                  </Button>


                </span>
              ) : null
            }

          </div>

        </Grid>

      </Grid>

      <div>

        <Textbox
          editable={editable}
          block={true}
          model={question}
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
            options.map ( (key, index) =>
            (
              <li
                style= {
                  {
                    'padding-top' : 25
                  }
                }
                placeholder = {'Type option here..    '}
                >

                <Textbox
                  editable={editable}
                  model={key[0]}
                  style={
                    {
                      width: 150,

                    }
                  }

                  >


                </Textbox>

                <span>

                  {
                    [0,1,2,3,4,5,6].map((i) =>
                    <span  style={{padding: 5}}>
                      <input
                        name={"bipolar." + index }
                        type={'radio'}
                        value={1}  />
                    </span>
                  )
                }
              </span>

              <Textbox
                editable={editable}
                model={key[1]}
                style={
                  {
                    width: 150,
                    float: 'right'

                  }
                }
                placeholder = {'Type option here..    '}

                >


              </Textbox>

            </li>
          )
        )
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
