import { primaryColor, btnPrimary, paper } from './material-dashboard';

const upStyle = theme => ({
  borTop2: {
    borderTop: `1px solid ${primaryColor}`,
  },
  currentCareerStage: {
    padding: '10px 0px',
    borderTop: `1px solid ${primaryColor}`,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: '0px',
    fontSize: '14px',
  },
  text: {
    marginBottom: '0px',
    textTransform: 'uppercase',
    fontSize: '14px',
  },
  dateOfJoining: {
    padding: '10px 0px',
    borderTop: `1px solid ${primaryColor}`,
  },
  primaryCapability: {
    padding: '10px 0px',
    borderTop: `1px solid ${primaryColor}`,
  },
  emailId: {
    padding: '10px 0px',
    borderTop: `1px solid ${primaryColor}`,
  },
  homeRegion: {
    padding: '10px 0px',
    borderTop: `1px solid ${primaryColor}`,
  },
  currentOffice: {
    padding: '10px 0px',
    borderTop: `1px solid ${primaryColor}`,
  },
  userProfile: {
    background: '#fff',
    textAlign: 'center',
  },
  userProfileDetail: {
    paddingTop: '50px',
    paddingBottom: '20px',
  },
  userFullName: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  userDesignation: {
    fontSize: '12px',
    marginBottom: '10%',
  },
  userProfileImageUploader: {
    position: 'relative',
  },
  userProfileImage: {
    borderRadius: '50%',
  },
  userProfileImageUpload: {
    position: 'absolute',
    top: '0',
    height: '100%',
    width: '100%',
    opacity: '0',
    zIndex: '1',
  },
  userOracleId: {
    fontSize: '12px',
    fontWeight: 'bold',
    marginBottom: '2px',
  },
  userOracleIdHeading: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  emailIdText: {
    textTransform: 'none',
  },
  userProfileImageImg: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    border: '1px solid #eee',
    display: 'inline-block',
  },
  uploaderButton: {
    color: '#fff',
  },
  btnPrimary,
  paper,
});

export default upStyle;

