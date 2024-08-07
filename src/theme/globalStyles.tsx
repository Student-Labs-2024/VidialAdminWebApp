import { useStyles } from 'tss-react/mui';
import { GlobalStyles } from 'tss-react';

const GlobalStylesComponent = () => {
  const { theme } = useStyles();

  return (
    <>
      <GlobalStyles
        styles={{
          '.root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          },
          '.iconAdd': {
            borderRadius: '30px !important',
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.secondary.main} !important`,
            padding: '10px 20px !important',
            width: '65px !important',
            height: 'auto !important',
            boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10) !important',
          },
          '.filterBtn': {
            borderRadius: '30px !important',
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.secondary.main} !important`,
            padding: '10px 20px !important',
            width: '65px !important',
            height: 'auto !important',
            boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10) !important',
          },
          '.contentBtns': {
            display: 'flex',
            gap: '10px',
            height: '45px',
            width: '100%',
            marginBottom: '25px',
          },
          '.listItemBtn': {
            borderRadius: '30px !important',
            '&.active': {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.main,
              '& .MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            },
            '&.inactive': {
              color: theme.palette.secondary.main,
              backgroundColor: 'transparent',
              '& .MuiListItemIcon-root': {
                color: theme.palette.secondary.main,
              },
            },
            '&:hover': {
              backgroundColor: `${theme.palette.secondary.main} !important`,
              color: `${theme.palette.primary.main} !important`,
            },
            '&:hover .MuiListItemIcon-root': {
              color: `${theme.palette.primary.main} !important`,
            },
          },
          '.listMenuItemBtn': {
            borderRadius: '30px !important',
            '&.active': {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              '.MuiListItemIcon-root': {
                color: theme.palette.primary.main,
              },
            },
            '&.inactive': {
              backgroundColor: theme.palette.primary.dark,
              color: theme.palette.grey[600],
              '.MuiListItemIcon-root': {
                color: theme.palette.grey[600],
              },
            },
            '&:hover': {
              backgroundColor: `${theme.palette.secondary.main} !important`,
              color: `${theme.palette.primary.main} !important`,
            },
            '&:hover .MuiListItemIcon-root': {
              color: `${theme.palette.primary.main} !important`,
            },
          },
          '.modalBox': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '611px',
            backgroundColor: theme.palette.secondary.main,
            boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
            padding: '71px 95px',
            borderRadius: '20px',
            textAlign: 'center',
          },
          '.modalText': {
            color: `${theme.palette.text.secondary} !important`,
            fontSize: `${theme.typography.h1.fontSize} !important`,
            fontWeight: `${theme.typography.h2.fontWeight} !important`,
            marginBottom: '35px !important',
          },
          '.modalBtns': {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
          },
          '.modalBtn': {
            fontSize: theme.typography.h3.fontSize,
            width: '100%',
          },
          '.formContainer': {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '40px',
          },
          '.formInputs': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            width: '400px',
          },
          '.uploadButtonContainer': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '350px',
          },
          '.uploadButton': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          },
          '.uploadButtonStyle': {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            border: `1px solid ${theme.palette.grey[600]}  !important`,
            padding: '10px',
          },
          '.uploadBtnText': {
            color: theme.palette.grey[600],
            fontSize: '14px',
            fontWeight: `${theme.typography.h2.fontWeight} !important`,
          },
          '.uploadBtnWarning': {
            textAlign: 'center',
            color: `${theme.palette.grey[600]} !important`,
          },
          '.uploadTextError': {
            textAlign: 'center',
            fontSize: '14px  !important',
            color: theme.palette.error.main,
          },
          '.uploadBtnImgName': {
            color: theme.palette.text.secondary,
            fontSize: '10px',
          },
          '.uploadedImageContainer': {
            width: '100%',
            maxWidth: '300px',
            height: 'auto',
            padding: '10px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          },
          '.uploadedImage': {
            borderRadius: '20px',
          },
          '.deleteButton': {
            color: theme.palette.text.primary,
          },
          '.serviceCard': {
            padding: '30px',
            backgroundColor: theme.palette.secondary.main,
            boxShadow: '5px 4px 4px 0px rgba(0, 0, 0, 0.10)',
            borderRadius: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          },
          '.serviceCardTitleAndDesc': {
            display: 'flex',
            flexDirection: 'column',
            width: '50% !important',
          },
          '.serviceCardTitle': {
            color: theme.palette.text.secondary,
            fontSize: '20px !important',
            fontWeight: theme.typography.h4.fontWeight,
          },
          '.serviceCardDescription': {
            color: theme.palette.grey[600],
            fontSize: '16px !important',
            fontWeight: theme.typography.body1.fontWeight,
          },
          '.serviceCardPrice': {
            color: theme.palette.text.secondary,
            fontSize: '20px !important',
            fontWeight: theme.typography.h4.fontWeight,
          },
          '.serviceBtnsContainer': {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          },
          '.serviceCardEditBtn': {
            width: '190px !important',
            padding: '7px 20px !important',
          },
          '.cardDivider': {
            color: theme.palette.grey[600],
            width: '100%',
          },
          '.doctorCardName': {
            color: `${theme.palette.text.secondary} !important`,
            fontSize: '18px',
            fontWeight: `${theme.typography.h2.fontWeight} !important`,
          },
          '.doctorCardCategory': {
            color: `${theme.palette.text.secondary} !important`,
            fontSize: '16px',
            fontWeight: `${theme.typography.body1.fontWeight} !important`,
          },
        }}
      />
    </>
  );
};

export default GlobalStylesComponent;
