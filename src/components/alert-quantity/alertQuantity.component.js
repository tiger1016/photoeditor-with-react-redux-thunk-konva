import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertQuantityComponent({isOpen, handleClose, handleRemove}) {
    const [open, setOpen] = React.useState(isOpen);

    React.useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    style: {
                        minHeight: '200px'
                    }
                }}
            >
                <DialogTitle id="alert-dialog-title">{"Remover image?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Essa ação irá remover a image. <br/>
                        Deseja continuar?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="default">
                        Não remover
                    </Button>
                    <Button onClick={handleRemove} color="default" autoFocus>
                        Sim, quero remover
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
