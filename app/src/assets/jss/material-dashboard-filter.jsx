import { primaryColor, btnPrimary, color3A3A3A, btnLinkPrimary, colorC9E8F3 } from './material-dashboard';

const filterStyle = theme => ({
  btnPrimary,
  btnLinkPrimary,
  colorC9E8F3,
  formControl: {
    width: '100%',
  },
  selectLabel: {
    fontSize: '12px',
    color: color3A3A3A,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  select: {
    border: '0',
    borderRight: '2px solid lightgray',
    fontSize: '10px',
    color: color3A3A3A,
    textTransform: 'uppercase',
    '&:before': {
      borderBottom: '0px',
    },
    '&:after': {
      borderBottom: '0px',
    },
    '&:hover': {
      borderBottom: '0px',
    },
  },
});

export default filterStyle;

