<template>
    <div v-if="!islogin">
        <h1> Wel come</h1>
        <button @click="login">Login</button>
    </div>
    <div v-else >
        <h1>Log in successfully</h1>
        <button @click="logout">Logout</button> <br> <br>
        <button @click="authenticateUser">IDToken</button><br> <br>
        <button @click="getUserInfo">getUserInfo</button><br> <br>
        <button @click="showWCM">showWCM</button><br> <br>
        <button @click="initiateTopUp">initiateTopUp</button><br> <br>
        <button @click="getChainId">getChainId</button><br> <br>
        <button @click="addChain">addChain</button><br> <br>
        <button @click="getAccounts">getAccounts</button><br> <br>
        <button @click="getBalance">getBalance</button><br> <br>
        <button @click="sendTransaction">sendTransaction</button><br> <br>
        <button @click="getPrivateKey">getPrivateKey</button><br> <br>
        



    </div>
</template>

<script>
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import RPC from "./web3RPC"; // for using web3.js

const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

export default {
    name: "HomeComponent",
    data() {
        return {
            web3auth: null,
            torusPlugin: null,
            provider: null,
            islogin: false,
        }
    },
    methods: {       
        async login() {
          

            try {
                const web3auth = new Web3Auth({
                    clientId,
                    chainConfig: {
                        chainNamespace: CHAIN_NAMESPACES.EIP155,
                        chainId: "0x1",
                        rpcTarget: "https://rpc.ankr.com/eth",
                    },
                    uiConfig: {
                        appName: "W3A Heroes",
                        mode: "light",
                        logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
                        logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
                        defaultLanguage: "en",
                        loginGridCol: 3,
                        primaryButton: "externalLogin",
                    },
                    web3AuthNetwork: "sapphire_mainnet",
                });

                const openloginAdapter = new OpenloginAdapter({
                    loginSettings: {
                        mfaLevel: "optional",
                    },
                    adapterSettings: {
                        whiteLabel: {
                            appName: "W3A Heroes",
                            logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
                            logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
                            defaultLanguage: "en",
                            mode: "dark",
                        },
                        mfaSettings: {
                            deviceShareFactor: {
                                enable: true,
                                priority: 1,
                                mandatory: true,
                            },
                            backUpShareFactor: {
                                enable: true,
                                priority: 2,
                                mandatory: false,
                            },
                            socialBackupFactor: {
                                enable: true,
                                priority: 3,
                                mandatory: false,
                            },
                            passwordFactor: {
                                enable: true,
                                priority: 4,
                                mandatory: false,
                            },
                        },
                        loginConfig: {
                            google: {
                                verifier: "w3a-google-demo",
                                typeOfLogin: "google",
                                clientId: "519228911939-cri01h55lsjbsia1k7ll6qpalrus75ps.apps.googleusercontent.com",
                            },
                            facebook: {
                                verifier: "w3a-facebook-demo",
                                typeOfLogin: "facebook",
                                clientId: "215892741216994",
                            },
                            discord: {
                                verifier: "w3a-discord-demo",
                                typeOfLogin: "discord",
                                clientId: "1151006428610433095",
                            },
                            twitch: {
                                verifier: "w3a-twitch-demo",
                                typeOfLogin: "twitch",
                                clientId: "3k7e70gowvxjaxg71hjnc8h8ih3bpf",
                            },
                        },
                    },
                });

                web3auth.configureAdapter(openloginAdapter);

                const torusPlugin = new TorusWalletConnectorPlugin({
                    torusWalletOpts: {},
                    walletInitOptions: {
                        whiteLabel: {
                            theme: { isDark: true, colors: { primary: "#00a8ff" } },
                            logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
                            logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
                        },
                        useWalletConnect: true,
                    },
                });

                await web3auth.addPlugin(torusPlugin);

                this.web3auth = web3auth;
                this.torusPlugin = torusPlugin;

                await web3auth.initModal({
                    modalConfig: {
                        [WALLET_ADAPTERS.OPENLOGIN]: {
                            label: "openlogin",
                            loginMethods: {
                                apple: { name: "facebook", showOnModal: false },
                                reddit: { name: "reddit", showOnModal: false },
                                line: { name: "line", showOnModal: false },
                                github: { name: "github", showOnModal: false },
                                wechat: { name: "wechat", showOnModal: false },
                                twitter: { name: "twitter", showOnModal: false },
                                kakao: { name: "kakao", showOnModal: false },
                                linkedin: { name: "linkedin", showOnModal: false },
                                weibo: { name: "weibo", showOnModal: false },
                                email_passwordless: { name: "email_passwordless", showOnModal: false },
                                sms_passwordless: { name: "sms_passwordless", showOnModal: false },
                            },
                        },
                        [WALLET_ADAPTERS.METAMASK]: {
                            label: "metamask",
                            loginMethods: { metamask: { name: "metamask", showOnModal: false } },
                        },
                    },
                });

                this.provider = web3auth.provider;

                if (web3auth.connected) {
                    console.log("web3auth connected...")
                    this.islogin = true;
                }
            } catch (error) {
                console.error(error);
            }


            // login start-----------
            if (!this.web3auth) {
                console.log("web3auth not initialized yet");
            }
             const web3authProvider = await this.web3auth.connect();
             this.provider = web3authProvider;
             this.loggedIn = true;
        },
        async logout() {
            if (!this.web3auth) {
                console.log("web3auth not initialized yet");
            }
            await this.web3auth.logout();
            this.provider = null;
            this.islogin = false;
            console.log("Logout..")
        },
        async authenticateUser() {
             if (!this.web3auth) {
                console.log("web3auth not initialized yet");
            }
            const idToken = await this.web3auth.authenticateUser();
            console.log("IdToken : ", idToken)
        },
        async getUserInfo() {
            if (!this.web3auth) {
                console.log("web3auth not initialized yet");
            }
            const user = await this.web3auth.getUserInfo();
            console.log("UserInfo : ",user)
        },
        async showWCM() {
            if (!this.torusPlugin) {
                console.log("torusPlugin not initialized yet");
            }
             this.torusPlugin.showWalletConnectScanner();
            console.log("showWCM Done ");
        },
        async initiateTopUp() {
             if (!this.torusPlugin) {
                console.log("torusPlugin not initialized yet");
            }
            const topup = this.torusPlugin.initiateTopup("moonpay", {
                selectedAddress: "0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF",
                selectedCurrency: "USD",
                 fiatValue: 100,
                selectedCryptoCurrency: "ETH",
                  chainNetwork: "mainnet",
            });
            console.log("initiateTopUp : ")
        },
        async getChainId() {
            if (!this.provider) {
              console.log("provider not initialized yet");
              return;
            }
             const rpc = new RPC(this.provider);
            const chainId = await rpc.getChainId();
            console.log("Chain ID : ", chainId);
        },
        async addChain() {
             if (!this.provider) {
              console.log("provider not initialized yet");
              return;
            }
             const newChain = {
                 chainId: "0x5",
                 displayName: "Goerli",
                 chainNamespace: CHAIN_NAMESPACES.EIP155,
                  tickerName: "Goerli",
                 ticker: "ETH",
                 decimals: 18,
                 rpcTarget: "https://rpc.ankr.com/eth_goerli",
                 blockExplorer: "https://goerli.etherscan.io",
             };
            const result = await this.web3auth?.addChain(newChain);
            console.log("new chain added ");
        },
        async getAccounts() {
            if (!this.provider) {
              console.log("provider not initialized yet");
              return;
            } 
            const rpc = new RPC(this.provider);
             const address = await rpc.getAccounts();
            console.log("Get Account : ", address);
        },
        async getBalance() {
            if (!this.provider) {
              console.log("provider not initialized yet");
              return;
            } 
             const rpc = new RPC(this.provider);
             const balance = await rpc.getBalance();
            console.log("Balance : ", balance);
        },
        async sendTransaction() {
             if (!this.provider) {
              console.log("provider not initialized yet");
              return;
            } 
             const rpc = new RPC(this.provider);
            const receipt = await rpc.sendTransaction();
            console.log("Receipt : ", receipt);
        },
        async getPrivateKey() {
          if (!this.provider) {
              console.log("provider not initialized yet");
              return;
            } 
             const rpc = new RPC(this.provider);
            const privateKey = await rpc.getPrivateKey();
            console.log("Private Key : ", privateKey);
       }
    }
}


</script>