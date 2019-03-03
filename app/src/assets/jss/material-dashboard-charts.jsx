import { primaryColor, btnPrimary, color3A3A3A, colorE9EAEC, colorF8B0B3, colorC9E8F3 } from './material-dashboard';

const chartStyle = theme => ({
  card: {
    borderRadius: '0px',
  },
  cardHeader: {
    borderBottom: `1px solid ${colorE9EAEC}`,
  },
  cardTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '2.3em',
  },
  selectLabel: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#222',
    textTransform: 'uppercase',
  },
  select: {
    fontSize: '10px',
    color: '#222',
    '&:before': {
      borderBottom: `1px solid ${colorE9EAEC}`,
    },
    '&:after': {
      borderBottom: `1px solid ${colorE9EAEC}`,
    },
    '&:hover': {
      borderBottom: `1px solid ${colorE9EAEC}`,
    },
  },
  viewDetail: {
    fontSize: '12px',
    color: '#222',
    float: 'left',
    margin: 'auto',
    width: 'unset',
  },
  menuItem: {
    fontSize: '10px',
    padding: '5px 5px',
    height: '20px',
    fontFamily: 'calibri',
    background: '#fff',
    '&:focus': {
      outLine: 'unset',
    }
  },
  btnPrimary,
  careerLevel: {
    listStyleType: 'none',
    paddingLeft: '5px',
    margin: '0px',
  },
  careerLevel_Li: {
    float: 'left',
    width: '33%',
  },
  levelApproved: {
    background: '#DDE383 !important',
  },
  levelApplied: {
    background: '#FBBFBD !important',
  },
  levelGrowth: {
    background: '#C5E2E6 !important',
  },
  levelRejected: {
    background: '#F06667 !important',
  },
  levelNone: {
    width: '15px',
    height: '15px',
    background: '#CCCCCC',
    borderRadius: '15px',
    float: 'left',
    marginRight: '5px',
  },
});

export default chartStyle;
// ul.career-level {
//   list-style-type: none;
//   padding-left: 5px;
//   margin: 0px;
//   /* width: 99%; */
// }

//   ul.career-level div.level-approved {
//       background: #DDE383 !important;
//   }

//   ul.career-level div.level-applied {
//       background: #FBBFBD !important;
//   }

//   ul.career-level div.level-growth {
//       background: #C5E2E6 !important;
//   }

//   ul.career-level div.level-rejected {
//       background: #f06667 !important;
//   }

//   ul.career-level div.level-none {
//       width: 15px;
//       height: 15px;
//       background: #CCCCCC;
//       -moz-border-radius: 15px;
//       -webkit-border-radius: 15px;
//       border-radius: 15px;
//       float: left;
//       margin-right: 5px;
//   }

//   ul.career-level li {
//       float: left;
//       width: 120px;
//   }