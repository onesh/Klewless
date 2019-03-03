import React from 'react';
import Textbox from '../../textbox';
import { Card, Icon, Grid, Button } from '@material-ui/core';
import cloner from '../../../services/clone.helper';
import  { model }  from './model';


export default class ScemanticQuestion extends React.Component {

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


  render() {
    const { isLoading, addOption, removeOption} = this.props.store;
    const { classes, deletequestion, saveQuestion } = this.props;
    const { name, options, question } = this.props.store.store.model;
    const { editable, showEditToggle } = this.props.store.store;

    const id = this.props.store.question._id;

    return (
      <Card style={{ margin: 10}}>

        <div class={'question-container'}>

          <Grid container spacing={10}>

          {
            showEditToggle ? ( <Grid item xs={4} md={4}>
                Edit mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={editable ? 'checked' : ''} value={editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
                Priview mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={!editable ? 'checked' : ''} value={!editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
            </Grid>) : (<span/>)
          }

           

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

<Grid container spacing={10}>
  <div>

    <Textbox
      model={question}
      editable={editable}
      style={
        {

        }
      }
      placeholder = {'Click and type question here..    '}
      >

    </Textbox>

  </div>
</Grid>

      <div>

        <ol>

          {
            options.map ( (value, index) =>
            (
              <Grid item xs={12} md={12}>
                <li
                  style= {
                    {
                      'text-align': 'center',
                      'padding-top' : 25
                    }
                  }
                  placeholder = {'Type option here..    '}
                  >

                  <Textbox
                    model={options[index][0]}
                    editable={editable}
                    style={
                      {

                        float: 'left',
                        'padding-left': '2%',
                      }
                    }

                    >


                  </Textbox>

                  <span>

                    <input
                      type={'number'}
                      style={
                        {

                          border:'none',
                          'border-bottom' : '1px solid lightgray',
                          'text-align': 'center'

                        }
                      }
                      />

                  </span>

                  <Textbox
                    model={options[index][1]}
                    editable={editable}
                    right={true}
                    style={
                      {

                        float: 'right',
                        'padding-right': '2%',
                      }
                    }
                    placeholder = {'Type option here..    '}

                    >


                  </Textbox>

                </li>
              </Grid>

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
