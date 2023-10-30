<template>
    <h1>Wel come {{msg}}</h1>
    <div v-if="!provider">
        
        <button @click="login" >Login</button>
    </div>
    <div v-else >
        <NavBar :provider="provider"/>
       <h1> hello login </h1> 
        <button @click="logout" >logout</button>
        <br><br>
        <button @click="authenticateUser" >authenticateUser </button>
        <br><br>
        <button @click="getUserInfo" >getUserInfo</button>
        <br><br>
        <button @click="getChainId" >getChainId</button>
        <br><br>
        <button @click="getAccounts" > getAccounts </button>
        <br><br>
        <button @click="getBalance" > getBalance </button>

        <br><br>
        <button @click="sendTransaction">sendTransaction</button>
        <br><br>
        <button @click="getPrivateKey">getPrivateKey</button>

    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
// HIGHLIGHTSTART-importModules
import { Web3Auth } from "@web3auth/modal";
// import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { CHAIN_NAMESPACES, IProvider } from "@web3auth/base";
import RPC from "./web3RPC";



export default {
    name: 'Home-Component',
    data() {
        return {
            loading: false,
            provider: null,
            clientId: "BMkKHE4n2KgzLWFXDmpCVIpWMggQ8Pe8_4pRkbm9aNafKnn0WRlb1zoy6JlOh2nN2Aw54jIAbFbsAUut3tuJr8w",
            
            web3auth:null
        }
    },
    components: {
        NavBar
    },
    props: {
        msg:String
    },
    
    methods: {
       
        
        async login() {
            
            const clientId = "BMkKHE4n2KgzLWFXDmpCVIpWMggQ8Pe8_4pRkbm9aNafKnn0WRlb1zoy6JlOh2nN2Aw54jIAbFbsAUut3tuJr8w"; // get from https://dashboard.web3auth.io
             this.web3auth = new Web3Auth({
          clientId, 
          web3AuthNetwork: "testnet", // mainnet, aqua,  cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });
             try {
                
                await this.web3auth.initModal();
                if (this.web3auth.provider) {
                    this.provider = this.web3auth.provider;
                    console.log("initilize")
                    
                }
            } catch (error) {
                console.log(error);
            } 
          if (!this.web3auth) {
             console.log("web3auth not initialized yet");
            return;
            }
            console.log("Start");
            this.provider = await this.web3auth.connect();
            console.log("End", typeof(this.provider));
            
        },
       async logout() {
           console.log("function call logout")
            if (!this.web3auth) {
             console.log("web3auth not initialized yet");
               return;
           }
           await this.web3auth.logout();
           
           console.log("logout");
            this.provider = null; 
        },

        async authenticateUser() {
             if (!this.web3auth) {
        // uiConsole("web3auth not initialized yet");
           console.log("web3auth not initialized yet");
            return;
             }
          const idToken = await this.web3auth.authenticateUser();
    //   uiConsole(idToken);
            console.log("Token id: ",idToken);
        },
        async getUserInfo() {
            if (!this.web3auth) {
          // uiConsole("web3auth not initialized yet");
         console.log("web3auth not initialized yet");
        return;
      }
      const user = await this.web3auth.getUserInfo();
    //   uiConsole(user);
          console.log("User : ",user);
        },


        async getChainId() {
            if (!this.provider) {
        //   uiConsole("provider not initialized yet");
               console.log("web3auth not initialized yet");
                return;
            }
           const rpc = new RPC(this.provider);
           const chainId = await rpc.getChainId();
      // uiConsole(chainId);
            console.log("Chain ID : ",chainId);
        },
        async getAccounts() {
            if (!this.provider) {
            //   uiConsole("provider not initialized yet");
               console.log("web3auth not initialized yet");
               return;
           }
          const rpc = new RPC(this.provider);
          const address = await rpc.getAccounts();
          // uiConsole(address);
           console.log("Account : ", address);
        },
        async getBalance() {
            if (!this.provider) {
             //   uiConsole("provider not initialized yet");
               console.log("web3auth not initialized yet");
               return;
           }
           const rpc = new RPC(this.provider);
           const balance = await rpc.getBalance();
           // uiConsole(balance);
          console.log("Balance : ", balance);
        },

        async sendTransaction() {
             if (!this.provider) {
        //   uiConsole("provider not initialized yet");
                console.log("web3auth not initialized yet");
              return;
            }
           const rpc = new RPC(this.provider);
           const receipt = await rpc.sendTransaction();
    // uiConsole(receipt);
           console.log("Receipt : ",receipt);
        },
        async getPrivateKey() {
            if (!this.provider) {
             //   uiConsole("provider not initialized yet");
               console.log("web3auth not initialized yet");
              return;
          }
          const rpc = new RPC(this.provider);
          const privateKey = await rpc.getPrivateKey();
         // uiConsole(privateKey);
           console.log("Private Key : ",privateKey);
        },

        
    },

    
}

</script>

