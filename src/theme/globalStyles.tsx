import { makeStyles } from 'tss-react/mui';

const useGlobalStyles: () => { classes: Record<string, string> } = makeStyles()((theme) => ({
    toastContainer: {
        width: 'auto',
    },
    listItemBtn: {
        borderRadius: '30px',
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
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        },
        '&:hover .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
    listMenuItemBtn: {
        borderRadius: '30px',
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '.MuiListItemIcon-root': {
                color: theme.palette.primary.main,
            },
        },
        '$.inactive': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.grey[600],
            '.MuiListItemIcon-root': {
                color: theme.palette.grey[600],
            },
        },
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        },
        '&:hover .MuiListItemIcon-root': {
            color: theme.palette.primary.main,
        },
    },
    modalBox: {
        position: 'absolute' as const,
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
    modalText: {
        color: theme.palette.text.secondary,
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        marginBottom: '35px',
    },
    modalBtns: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px',
    },
    modalBtn: {
        fontSize: theme.typography.h3.fontSize,
        width: '100%',
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '40px',
    },
    formInputs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '400px',
    },
    uploadButtonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '350px',
    },
    uploadButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    uploadButtonStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        border: `1px solid ${theme.palette.grey[600]}`,
        padding: '10px',
    },
    uploadBtnText: {
        color: theme.palette.grey[600],
        fontSize: '14px',
        fontWeight: theme.typography.h2.fontWeight,
    },
    uploadBtnWarning: {
        textAlign: 'center',
        color: theme.palette.grey[600],
    },
    uploadTextError: {
        textAlign: 'center',
        fontSize: '14px',
        color: theme.palette.primary.main,
    },
    uploadBtnImgName: {
        color: theme.palette.text.secondary,
        fontSize: '10px',
    },
    uploadedImageContainer: {
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
    uploadedImage: {
        borderRadius: '20px',
    },
    deleteButton: {
        color: theme.palette.text.primary,
    },
}));

export default useGlobalStyles;
