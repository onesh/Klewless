import React from 'react';
import Textbox from '../../textbox';
import { inject, observer } from 'mobx-react';
import { Card, Icon, Grid, Button } from '@material-ui/core';
import styles from './style.css';

export default class MatrixTable extends React.Component {

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
    debugger;
    const { isLoading, addOption, removeOption} = this.props.store;
    const { classes, deletequestion, saveQuestion } = this.props;
    const { name, options, question } = this.props.store.store.model;
    const { editable } = this.props.store.store;
    const id = this.props.store.question._id;

    return (

      <Card style={{ margin: 10}} >

        <div class={'question-container'}>

          <Grid container spacing={10}>



            <Grid item xs={4} md={4}>



            Edit mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={editable ? 'checked' : ''} value={editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
            Priview mode<input type={'radio'} name={'edit_priview_' + id} style={{cursor: 'pointer'}} checked={!editable ? 'checked' : ''} value={!editable} onClick={this.editModeToggler.bind(this, this.props.store.store)} title={'delete question'} color="primary" />
        </Grid>



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

        <table>

          <tr>

            <th>
            </th>

            <th> Very <br/>Satisfied </th>

            <th> Somewhat <br/> Satisfied </th>

            <th> Neutral </th>

            <th> Somewhat <br/> Dissatisfied </th>

            <th> Very <br/> Dissatisfied</th>

          </tr>

          {
            options.map ( (key, index) =>
            (
              <tr>

                <td>
                  <Textbox
                    model={options[index]}
                    editable={editable}
                    style={
                      {
                        width: 150,
                      }
                    }

                    >


                  </Textbox>

                </td>

                <td>
                  <span  style={{padding: 5}}>
                    <input
                      name={"bipolar." + index }
                      type={'radio'}
                      value={1}  />
                  </span>
                </td>

                <td>
                  <span  style={{padding: 5}}>
                    <input
                      name={"bipolar." + index }
                      type={'radio'}
                      value={1}  />
                  </span>
                </td>

                <td>
                  <span  style={{padding: 5}}>
                    <input
                      name={"bipolar." + index }
                      type={'radio'}
                      value={1}  />
                  </span>
                </td>

                <td>
                  <span  style={{padding: 5}}>
                    <input
                      name={"bipolar." + index }
                      type={'radio'}
                      value={1}  />
                  </span>
                </td>

                <td>
                  <span  style={{padding: 5}}>
                    <input
                      name={"bipolar." + index }
                      type={'radio'}
                      value={1}  />
                  </span>
                </td>

              </tr>
            )
          )
        }
      </table>

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
