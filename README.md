# TP2 - Tests unitaires
## _Système de vote_

[![N|Solid](https://alyra.fr/wp-content/uploads/2019/06/logo-titre-alyra-bleu-transparent-64px_v3.png)](https://github.com/senouy/alyra-ropsten-tp2)

## Installation

Cloner le projet depuis le repository public https://github.com/senouy/alyra-ropsten-tp3

### Installation React

Installer et lancer le projet react en local

```sh
cd /clients/
npm install
npm run start
```

### Installation Truffle

Lancer ganache depuis un autre terminal
```sh
ganache
```

Déployer le smart contract en local
```sh
cd /truflle/
truffle migrate
```

### Documentation

Lien vers la documentation https://ipfs.io/ipfs/QmQ1y9pxT88Tix41dt1tcUZqGfAmBQbaihUqVXYZASiBLh

Developer Documentation

```sh
{"author":"Cyril Castagnet & Ghofrane Ben Younes","details":"This contract hasn't been audited yet, please be carreful when using it","kind":"dev","methods":{"addProposal(string)":{"details":"We have limited the number of proposals in order to avoid DDoS attack","params":{"_desc":"Description of the proposal to add"}},"addVoter(address)":{"params":{"_addr":"Address's voter to add to the whitlist"}},"getOneProposal(uint256)":{"params":{"_id":"Identifier of a specific proposal"},"returns":{"_0":"Proposal The proposal structure according to `_id`"}},"getVoter(address)":{"params":{"_addr":"The address of a voter"},"returns":{"_0":"Voter The voter structure according to `_addr`"}},"owner()":{"details":"Returns the address of the current owner."},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"setVote(uint256)":{"params":{"_id":"Identifier of the proposal"}},"tallyVotes()":{"details":"don't worry about DDoS atack while iterate on proposalsArray, we have limited the number of elements"},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"title":"Full voting process","version":1}
```

```sh
User Documentation
{"kind":"user","methods":{"addProposal(string)":{"notice":"Add proposal only if you are a voter & voters are limited to add 100 proposals in total"},"endProposalsRegistering()":{"notice":"Change step from \"Start Registering Proposal\" to \"End Registering Proposal\" only if you are a voter and only one time"},"endVotingSession()":{"notice":"Change step from \"Start Voting\" to \"End Voting\" only if you are a voter and only one time"},"setVote(uint256)":{"notice":"Vote for a proposal only if you are a voter and only one time"},"startProposalsRegistering()":{"notice":"Change step from \"Regitering Voter\" to \"Start Registering Proposal\" only if you are a voter and only one time"},"startVotingSession()":{"notice":"Change step from \"End Registering Proposal\" to \"Start Voting\" only if you are a voter and only one time"},"tallyVotes()":{"notice":"Iterate on all votes and designate winning proposal"}},"notice":"You can use this contract only in a beta mode","version":1}
```

======= node_modules/@openzeppelin/contracts/access/Ownable.sol:Ownable =======

Developer Documentation

```sh
{"details":"Contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. By default, the owner account will be the one that deploys the contract. This can later be changed with {transferOwnership}. This module is used through inheritance. It will make available the modifier `onlyOwner`, which can be applied to your functions to restrict their use to the owner.","kind":"dev","methods":{"constructor":{"details":"Initializes the contract setting the deployer as the initial owner."},"owner()":{"details":"Returns the address of the current owner."},"renounceOwnership()":{"details":"Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner."},"transferOwnership(address)":{"details":"Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner."}},"version":1}
```

User Documentation

```sh
{"kind":"user","methods":{},"version":1}
```

======= node_modules/@openzeppelin/contracts/utils/Context.sol:Context =======

Developer Documentation

```sh
{"details":"Provides information about the current execution context, including the sender of the transaction and its data. While these are generally available via msg.sender and msg.data, they should not be accessed in such a direct manner, since when dealing with meta-transactions the account sending and paying for execution may not be the actual sender (as far as an application is concerned). This contract is only required for intermediate, library-like contracts.","kind":"dev","methods":{},"version":1}
```

User Documentation

```sh
{"kind":"user","methods":{},"version":1}
```
