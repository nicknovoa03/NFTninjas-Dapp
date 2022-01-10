import { ethers } from 'ethers';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import MintBackground from './Samples/MintBackground.GIF'
import { contractAddr, contract } from './Contract';

function FullScreenHook() {

    const [mintAmount, setMintAmount] = useState(1);
    const [wallet, setWallet] = useState();
    const [web3, setWeb3] = useState();
    // const whitelist = WhitelistDictionary();

    const providerOptions = {
        injected: {
            package: null
        },
        walletconnect: {
            package: WalletConnectProvider,
            network: "ethereum",
            options: {
                infuraId: "bad8cc770bef49dc88683bf2290205c8" // required
            }
        }
    };

    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
    });

    async function connect() {
        try {
            let provider;
            provider = await web3Modal.connect();
            let web3 = new Web3(provider);
            setWeb3(web3);
            web3.eth.getAccounts().then(async (addr) => {
                setWallet(addr[0]);
            });
        } catch (e) {
            console.log(e);
            return;
        }
    }

    async function mint() {
        const price = 1.95 * mintAmount;
        const mintable_price = price.toString();

        const tx = {
            from: wallet,
            to: contractAddr,
            value: ethers.utils.parseEther(mintable_price)["_hex"],
            gas: 210000,
            data: contract.methods.mintAccessPass(mintAmount).encodeABI(),
        };

        const createTransaction = await web3.eth.sendTransaction(tx);
    }

    function handleSlider(event, value) {
        event.preventDefault();
        setMintAmount(value);
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: [
                'Open Sans',
                'Roboto'
            ].join(','),
        }
    });

    function Copyright(props) {
        return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://www.blackboxcollective.io/">
                    Black Box Collective
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        }
    ];

    const Web3Button = styled(Button)({
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'grey',
        fontFamily: [
            'Roboto',
        ].join(','),
        '&:hover': {
            backgroundColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: 'rgba(255, 255, 255, 0.16)',
        },
        '&:active': {
            boxShadow: '#fff',
            backgroundColor: '#fff',
            borderColor: '#fff',
        }
    });


    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                component="main"
                sx={{
                    height: '100vh',
                    width: '100%',
                    backgroundImage: `url(${MintBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'Transparent',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <CssBaseline />
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Box
                        container
                        sx={{
                            width: 500,
                            marginTop: 35,
                            backgroundColor: '#121212',
                            borderRadius: 10,
                            opacity: [1, 1, .92],
                        }}
                        sm={4}
                    >
                        <Typography
                            component="h1"
                            variant="Title"
                            fontWeight="fontWeightBold"
                            color="White"
                            align="center"
                            display='flex'
                            justifyContent='center'
                        >
                            BLACK BOX COLLECTIVE
                        </Typography>
                        <Slider
                            onChangeCommitted={(events, value) => handleSlider(events, value)}
                            aria-label="Mint Amount"
                            defaultValue={1}
                            step={1}
                            marks={marks}
                            min={1}
                            max={2}
                            sx={{
                                color: 'text.primary',
                            }}
                        />
                        {wallet &&
                            <Web3Button
                                fullWidth
                                variant="contained"
                                onClick={mint}
                            >
                                Mint
                            </Web3Button>
                        } {!wallet &&
                            <Web3Button
                                fullWidth
                                variant="contained"
                                onClick={() => connect()}
                            >
                                Connect
                            </Web3Button>
                        }
                        <Typography
                            component="h4"
                            variant="Subtitle"
                            color="White"
                            align="center"
                            display='flex'
                            justifyContent='center'
                            sx={{
                                m: 1
                            }}
                        >
                            Connected Wallet: {wallet}
                        </Typography>
                        <Typography
                            component="h4"
                            variant="Subtitle"
                            color="White"
                            align="center"
                            display='flex'
                            justifyContent='center'
                            sx={{
                                m: 1
                            }}
                        >
                            Contract Address: {contractAddr}
                        </Typography>
                        <Copyright sx={{ mt: 1 }} />
                    </Box>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default FullScreenHook;