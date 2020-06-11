/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..','..','fabric-samples' ,'first-network', 'connection-org1.json');

router.post('/',async(req,res) =>{
    
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists(req.body.email);
        if (userExists) {
            console.log('An identity for the user "user1" already exists in the wallet');
            return;
        }

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.exists('admin');
        if (!adminExists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });

        console.log("Connected to gateway")
        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        console.log("hi")

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: req.body.email, role: 'client' }, adminIdentity);
        console.log("hi")
        const enrollment = await ca.enroll({ enrollmentID: req.body.email, enrollmentSecret: secret });
        const userIdentity = X509WalletMixin.createIdentity('Org1MSP', enrollment.certificate, enrollment.key.toBytes());
        await wallet.import(req.body.email, userIdentity);
        console.log("hi")

        gateway.disconnect();
        let response = await registerInLedger(req);

    } catch (error) {
        console.error(`Failed to register user "user1": ${error}`);
        process.exit(1);
    }
});

async function registerInLedger(req){
    try{
        const walletPath = path.join(process.cwd(), '../wallet');
        const wallet = new FileSystemWallet(walletPath);

        const gateway = new Gateway();
        await gateway.connect(ccpPath,{wallet,identity:req.body.email,discovery:{enabled:true,asLocalhost:true}});
        console.log("func")
        const network = await gateway.getNetwork('mychannel');
        console.log("hie")
        const contract = network.getContract('contract');
        console.log("hello")
         let response = await contract.submitTransaction('createUser',req.body.firstName,req.body.lastName,req.body.email,req.body.password);

        console.log("hello")
        console.log(response);

        gateway.disconnect();
        return response;
    }
    catch(error){
        console.log(` ... Failed to submit Transaction to the ledger ${error} ... `);
        process.exit(1);
    }
}

module.exports = router;



