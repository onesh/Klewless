import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { inject, observer } from 'mobx-react';
import {Icon, Grid, Button, Card  } from '@material-ui/core';



@inject ('QuestionListStore', 'Test')
@observer
class QuestionList extends React.Component {
  render() {
    console.log('re-rendered question list as its props changed');
    const { open, openDrawer, closeDrawer, pushQuestionInTest, questionTypes} = this.props.QuestionListStore;
      if (open) {
        return (
        <Drawer
          anchor="right"
          open={open}
          onOpen={document.onclick = closeDrawer.bind(this.props.QuestionListStore)}
          >
            <div
              tabIndex={0}
              role="button"
              >

            <Grid container spacing={10}>
              <table style={{margin: 100, 'margin-top': 15}}>
              {
              questionTypes.map((question_name, index) => {
              let icon = (
                <Grid item xs={6} md={6}style={{padding: 15}}>
                <tr>
                    <td>
                        <Button  className={'primary'} style={{cursor: 'pointer'}} onClick={pushQuestionInTest.bind(this.props.Test, index, questionTypes)} ><p style={{'font-family': 'cursive', 'font-size': 12}}>{question_name}</p></Button>
                    </td>
                </tr>
              </Grid>
            )
              return icon;
             }
            )
           }
         </table>
         </Grid>
            </div>
          </Drawer>
      )
    }
else {
  return (
      <span style={{cursor: 'pointer', float: 'right', position: 'fixed'}} onClick={openDrawer.bind(this.props.QuestionListStore)}>
      <Icon style={{cursor: 'pointer'}} onClick={openDrawer.bind(this.props.QuestionListStore)} title={'question list'} color="primary">format_align_justify</Icon>
      </span>)
}


  }
}

export default QuestionList;
