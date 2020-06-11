import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MainLayout from '../MainLayout/MainLayout'

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

import SaveIcon from '@material-ui/icons/Save';
import StarIcon from '@material-ui/icons/Star';
import Fab from '@material-ui/core/Fab';

import style from './Profile.module.css'
import { makeStyles } from '@material-ui/core/styles';

export default function Technical() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const useStyles = makeStyles((theme) => ({
        popover: {
            pointerEvents: 'none',
        },
        paper: {
            padding: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <MainLayout>
                <Card>
                    <CardContent>
                        <div>
                            <Fab
                                className={style.rateIcon}
                                size="large"
                                color="secondary"
                                aria-label="add"
                                onMouseEnter={handlePopoverOpen}
                                onMouseLeave={handlePopoverClose}
                            >
                                <div className={style.starIconText}>{4}</div>
                                <StarIcon className={style.starIcon} />
                            </Fab>
                            <Popover
                                id="mouse-over-popover"
                                className={classes.popover}
                                classes={{
                                    paper: classes.paper,
                                }}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={handlePopoverClose}
                                disableRestoreFocus
                            >
                                <Typography>Nota de avaliação</Typography>
                            </Popover>
                        </div>
                        <Typography className={style.title} variant="h5" component="h2">
                            Perfil do {"Cliente"} {"Bananinha"}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6">
                                    Dados de login
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>login</InputLabel>
                                    <OutlinedInput
                                        id="login"
                                        readOnly={true}
                                        value={"bananinha123"}
                                        labelWidth={40}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Senha</InputLabel>
                                    <OutlinedInput
                                        id="passwrd"
                                        labelWidth={50}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Confirmação de senha</InputLabel>
                                    <OutlinedInput
                                        id="confPasswrd"
                                        labelWidth={170}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6">
                                    Dados Pessoais
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Nome</InputLabel>
                                    <OutlinedInput
                                        id="name"
                                        value={"Bananinha"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} name="canShowAddress"></Grid>
                            <Grid item xs={3} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Cep</InputLabel>
                                    <OutlinedInput
                                        id="zipCodw"
                                        value={"12345678"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={9} name="canShowAddress"></Grid>
                            <Grid item xs={6} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Rua</InputLabel>
                                    <OutlinedInput
                                        id="street"
                                        value={"rua da banana"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Numero</InputLabel>
                                    <OutlinedInput
                                        id="numberm"
                                        value={"12"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Complemento</InputLabel>
                                    <OutlinedInput
                                        id="complement"
                                        value={"CASA"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Bairro</InputLabel>
                                    <OutlinedInput
                                        id="neighborhod"
                                        value={"bairro banana"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Cidade</InputLabel>
                                    <OutlinedInput
                                        id="city"
                                        value={"city banana"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress">
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Estado</InputLabel>
                                    <OutlinedInput
                                        id="state"
                                        value={"estado banana"}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={11}></Grid>
                            <Grid item xs={1}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="medium"
                                    startIcon={<SaveIcon />}
                                >
                                    Salvar
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </MainLayout>
        </div >
    );
}