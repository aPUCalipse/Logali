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

import cep from 'cep-promise'

import axios from 'axios'

export default function Technical() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [userId, setUserId] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confPassword, setConfPassword] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [nameTitle, setNameTitle] = React.useState(null);
    const [typeUser, setTypeUser] = React.useState(null);
    const [idTypeUser, setIdTypeUser] = React.useState(null);
    const [zipCode, setZipCode] = React.useState(null);
    const [street, setStreet] = React.useState(null);
    const [number, setNumber] = React.useState(null);
    const [complement, setComplement] = React.useState(null);
    const [neighborhood, setNeighborhood] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [state, setState] = React.useState(null);
    const [rateAVG, setRateAVG] = React.useState(null);
    const [geolocX, setGeolocX] = React.useState(null);
    const [geolocY, setGeolocY] = React.useState(null);

    const [hasGetted, setHasGette] = React.useState(false);


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

    const updateUserData = async () => {
        const body = {
            userId: userId,
            nome: name,
            login: login,
            senha: null,
            tipoUsuario: idTypeUser,
            estado: state,
            cidade: city,
            bairro: neighborhood,
            rua: street,
            cep: zipCode,
            numero: number,
            complemento: complement,
            geolocX: null,
            geolocY: null
        }

        if (password) {
            if (password !== confPassword) {
                alert("As senhas ao conferem")
                return
            } else {
                body.senha = password
            }
        } else {
            alert("Você deve digitar a senha e a cofnirmação da senha para atualizar seu dados")
            return
        }

        const fullAddresSplitedByPlus = `` +
            `${zipCode.toString().replace(" ", "+")}+` +
            `${street.replace(" ", "+")}+` +
            `${number.toString().replace(" ", "+")}+` +
            `${neighborhood.replace(" ", "+")}+` +
            `${city.replace(" ", "+")}` +
            `${state.replace(" ", "+")}` +
            `Brasil`

        const APIResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${fullAddresSplitedByPlus}&key=AIzaSyCkIMj_uHe2IZkO0jtrx-tYGPbcJyvr2jo`)

        const addressData = APIResponse.data.results.pop().geometry.location

        setGeolocX(addressData.lat)
        setGeolocY(addressData.lng)

        body.geolocX = geolocX
        body.geolocY = geolocY

        const updateOfUser = await axios.put("http://localhost:8000/logali/app/register/update", body)

        if (updateOfUser.status === 200) {
            alert("Usuario alterado com sucesso")
        } else {
            alert(updateOfUser.data.message)
        }
    }

    const getUserData = async () => {
        try {
            const userDataLocal = JSON.parse(localStorage.getItem("userData"))

            if (userDataLocal && userDataLocal.isLogged && userDataLocal.idUser) {
                const body = {
                    "userId": userDataLocal.idUser
                }

                const response = await axios.post("http://localhost:8000/logali/app/user/takeDatas", body)
                console.log(response)

                if (response.status === 200) {
                    const userData = response.data.data
                    setUserId(userDataLocal.idUser)
                    setLogin(userData.login)
                    setName(userData.name)
                    setNameTitle(userData.name)
                    setZipCode(userData.zipCode)
                    setStreet(userData.street)
                    setNumber(userData.number)
                    setComplement(userData.complement)
                    setNeighborhood(userData.neighborhood)
                    setCity(userData.city)
                    setState(userData.state)
                    setRateAVG(userData.rateAVG)
                    setGeolocX(userData.geoLocX)
                    setGeolocY(userData.geoLocY)
                    setIdTypeUser(userData.typeUserId)

                    if (userData.typeUserId === 1) {
                        setTypeUser("Cliente")
                        const addressInput = document.getElementsByName('canShowAddress')
                        for (let i = 0; i < addressInput.length; i++) {
                            addressInput[i].removeAttribute('style');
                        }
                    } else if (userData.typeUserId === 2) {
                        setTypeUser("Tecnico")
                    }
                } else {
                    alert(response.data.message)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onBlurZipCode = async (element) => {
        const zipCode = element.target.value
        if (zipCode && zipCode.length === 8) {
            try {
                const response = await cep(zipCode)
                console.log(response)

                document.getElementById('number').removeAttribute('readonly');
                document.getElementById('complement').removeAttribute('readonly');

                if (response.street) {
                    setStreet(response.street)
                } else {
                    document.getElementById('street').removeAttribute('readonly');
                }

                if (response.neighborhood) {
                    setNeighborhood(response.neighborhood)
                } else {
                    document.getElementById('neighborhod').removeAttribute('readonly');
                }

                if (response.city) {
                    setCity(response.city)
                } else {
                    document.getElementById('city').removeAttribute('readonly');
                }

                if (response.state) {
                    setState(response.state)
                }
            } catch (err) {
                console.log(err)
                alert("Endereço não encontrado pelo CEP informado")
            }
        } else {
            alert("O cep deve conter 8 numeros")
        }
    }

    if (!hasGetted) {
        getUserData()
        setHasGette(true)
    }

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
                                <div className={style.starIconText}>{rateAVG}</div>
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
                            Perfil do {typeUser} {nameTitle}
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" component="h6">
                                    Dados de login
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>login</InputLabel>
                                    <OutlinedInput
                                        id="login"
                                        readOnly={true}
                                        value={login}
                                        onChange={(event) => {
                                            setLogin(event.target.value)
                                        }}
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
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value)
                                        }}
                                        labelWidth={50}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Confirmação de senha</InputLabel>
                                    <OutlinedInput
                                        id="confPasswrd"
                                        value={confPassword}
                                        onChange={(event) => {
                                            setConfPassword(event.target.value)
                                        }}
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
                                    <InputLabel shrink>Nome</InputLabel>
                                    <OutlinedInput
                                        id="name"
                                        value={name}
                                        onChange={(event) => {
                                            setName(event.target.value)
                                        }}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={8} name="canShowAddress" style={{ display: "none" }}></Grid>
                            <Grid item xs={3} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Cep</InputLabel>
                                    <OutlinedInput
                                        id="zipCode"
                                        value={zipCode}
                                        onChange={(event) => {
                                            setZipCode(event.target.value)
                                        }}
                                        labelWidth={60}
                                        onBlur={onBlurZipCode}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={9} name="canShowAddress" style={{ display: "none" }}></Grid>
                            <Grid item xs={6} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Rua</InputLabel>
                                    <OutlinedInput
                                        id="street"
                                        value={street}
                                        onChange={(event) => {
                                            setStreet(event.target.value)
                                        }}
                                        readOnly={true}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Numero</InputLabel>
                                    <OutlinedInput
                                        id="number"
                                        readOnly={true}
                                        value={number}
                                        onChange={(event) => {
                                            setNumber(event.target.value)
                                        }}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Complemento</InputLabel>
                                    <OutlinedInput
                                        id="complement"
                                        readOnly={true}
                                        value={complement}
                                        onChange={(event) => {
                                            setComplement(event.target.value)
                                        }}
                                        labelWidth={100}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Bairro</InputLabel>
                                    <OutlinedInput
                                        id="neighborhod"
                                        readOnly={true}
                                        value={neighborhood}
                                        onChange={(event) => {
                                            setNeighborhood(event.target.value)
                                        }}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Cidade</InputLabel>
                                    <OutlinedInput
                                        id="city"
                                        readOnly={true}
                                        value={city}
                                        onChange={(event) => {
                                            setCity(event.target.value)
                                        }}
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} name="canShowAddress" style={{ display: "none" }}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel shrink>Estado</InputLabel>
                                    <OutlinedInput
                                        id="state"
                                        readOnly={true}
                                        value={state}
                                        onChange={(event) => {
                                            setState(event.target.value)
                                        }}
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
                                    onClick={updateUserData}
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