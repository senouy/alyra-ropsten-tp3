import React, { Component } from "react";
import * as CONSTANTS from "./constants";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import Header from "./components/Header.js";
import WorkFlowStatus from "./components/WorkFlowStatus.js";
import Actions from "./components/Actions.js";
import WinningProposal from "./components/WinningProposal";
import ListVoters from "./components/ListVoters";
import ListProposals from "./components/ListProposals";
import ListVotes from "./components/ListVotes";

import "./App.css";

class App extends Component {
  state = { worflowStatus: 0, listVoterAddress: [], listProposal: [], listVote: [], owner: null, userRole: null,
            winningProposalID: null, web3: null, accounts: null, contract: null, addresses: null};

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = VotingContract.networks[networkId];
      const contract = new web3.eth.Contract(
        VotingContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
      
      let worflowStatus = await contract.methods.workflowStatus().call();
      let winningProposalID = await contract.methods.winningProposalID().call();
      let owner = await contract.methods.owner().call();

      let option = {
        fromBlock:0,
        toBlock: 'latest'
      }
      const listVoterAddress = await contract.getPastEvents('VoterRegistered', option);
      const listProposalID = await contract.getPastEvents('ProposalRegistered', option);
      const listVote = await contract.getPastEvents('Voted', option);
      const userRole = this.getRole(accounts[0], owner, listVoterAddress);

      let listProposal = [];
      if(userRole === CONSTANTS.USER_ROLE.VOTER){
        await Promise.all(listProposalID.map(async (proposalID) => {
          let proposalString = await contract.methods.getOneProposal(parseInt(proposalID.returnValues.proposalId)).call({from: accounts[0]});
          listProposal.push({id: proposalID.returnValues.proposalId, desc: proposalString.description});
        }));
      }
      else{
        listProposalID.forEach(proposalID => {
          listProposal.push({id: proposalID.returnValues.proposalId, desc: 'xxx (only visible by voters)'});
      });
      }

      this.setState({worflowStatus : parseInt(worflowStatus), winningProposalID, listVoterAddress, listProposal, listVote, 
                    owner,userRole, web3, accounts, contract});
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  addVoter = async () => {
    const {accounts, contract} = this.state;
    const addressNewVoter = document.getElementById("address_new_voter_value").value;

    try {

      await contract.methods.addVoter(addressNewVoter).send({from: accounts[0]});

      let option = {
        fromBlock:0,
        toBlock: 'latest'
      }
      const listVoterAddress = await contract.getPastEvents('VoterRegistered', option);

      this.setState({listVoterAddress:listVoterAddress});

      //clear input
      document.getElementById("address_new_voter_value").value = '';
    } catch (error) {
      this.diplayErrorMessage('Une erreur est survenue');
      console.error(error);
    }  
  }

  addProposal = async () => {
    const {accounts, contract} = this.state;
    const newProposal = document.getElementById("new_proposal_value").value;

    try {

      await contract.methods.addProposal(newProposal).send({from: accounts[0]});

      let option = {
        fromBlock:0,
        toBlock: 'latest'
      }
      const listProposalID = await contract.getPastEvents('ProposalRegistered', option);

      let listProposal = [];
      if(this.state.userRole === CONSTANTS.USER_ROLE.VOTER){
        await Promise.all(listProposalID.map(async (proposalID) => {
          let proposalString = await contract.methods.getOneProposal(parseInt(proposalID.returnValues.proposalId)).call({from: accounts[0]});
          listProposal.push({id: proposalID.returnValues.proposalId, desc: proposalString.description});
        }));
      }
      else{
        listProposalID.forEach(proposalID => {
          listProposal.push({id: proposalID.returnValues.proposalId, desc: 'xxx (only visible by voters)'});
      });
      }

      this.setState({listProposal:listProposal});

      //clear input
      document.getElementById("new_proposal_value").value = '';
    } catch (error) {
      this.diplayErrorMessage('Une erreur est survenue');
      console.error(error);
    }  
  }

  setVote = async () => {
    const {accounts, contract} = this.state;
    const proposalID = parseInt(document.getElementById("set_vote_value").value);

    try {

      await contract.methods.setVote(proposalID).send({from: accounts[0]});

      let option = {
        fromBlock:0,
        toBlock: 'latest'
      }
      const listVote = await contract.getPastEvents('Voted', option);

      this.setState({listVote:listVote});

      //clear input
      document.getElementById("set_vote_value").value = '';
    } catch (error) {
      this.diplayErrorMessage('Une erreur est survenue');
      console.error(error);
    }  
  }

  switchStatus = async () => {
    const {accounts, contract} = this.state;
    let newWorkFlowStatus = this.state.worflowStatus;

    try {
        switch(this.state.worflowStatus){
        case CONSTANTS.WORKFLOW_STATUS.REGISTERING_VOTERS: 
            await contract.methods.startProposalsRegistering().send({from: accounts[0]});
            newWorkFlowStatus = CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_STARTED;
            break;
        case CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_STARTED: 
            await contract.methods.endProposalsRegistering().send({from: accounts[0]});
            newWorkFlowStatus = CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_ENDED;
            break;
        case CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_ENDED: 
            await contract.methods.startVotingSession().send({from: accounts[0]});
            newWorkFlowStatus = CONSTANTS.WORKFLOW_STATUS.VOTING_SESSION_STARTED;
            break;
        case CONSTANTS.WORKFLOW_STATUS.VOTING_SESSION_STARTED: 
            await contract.methods.endVotingSession().send({from: accounts[0]});
            newWorkFlowStatus = CONSTANTS.WORKFLOW_STATUS.VOTIN_SESSION_ENDED;
            break; 
        case CONSTANTS.WORKFLOW_STATUS.VOTIN_SESSION_ENDED: 
            await contract.methods.tallyVotes().send({from: accounts[0]});
            newWorkFlowStatus = CONSTANTS.WORKFLOW_STATUS.VOTES_TALLIED;

            //After computing vote, get the winning proposal ID
            let winningProposalID = await contract.methods.winningProposalID().call();
            this.setState({winningProposalID});
            break; 
        default: //display an error message;
        }

        document.getElementById("workflow-status").classList.add('blink');
        setTimeout(() => {
          document.getElementById("workflow-status").classList.remove('blink');
        }, 3000);

        this.setState({worflowStatus:newWorkFlowStatus});

    } catch (error) {
      this.diplayErrorMessage('Une erreur est survenue');
      console.error(error);
    }
  }

  getRole(userAddress, ownerAddress, listVoterAddress){
        
    if(userAddress === ownerAddress){
        return CONSTANTS.USER_ROLE.OWNER;
    }
    else{
        let isVoter = false;
        listVoterAddress.forEach(address => {
            if(userAddress === address.returnValues.voterAddress){
              isVoter = true;
            }
        });
        
        return isVoter ? CONSTANTS.USER_ROLE.VOTER : CONSTANTS.USER_ROLE.VISITOR;
    }
  }

  diplayErrorMessage(message){
    document.getElementById("error-message").innerHTML = message;
    document.getElementById("error-message").classList.remove('hide');

    setTimeout(() => {
      document.getElementById("error-message").classList.add('hide');
    }, 10000);
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Header addr={this.state.accounts} userRole={this.state.userRole} />
        
        <section className="main-container">
            <WorkFlowStatus  worflowstatus={this.state.worflowStatus} userRole={this.state.userRole}
                            switchStatus={this.switchStatus} />
          
            <Actions  worflowstatus={this.state.worflowStatus} userRole={this.state.userRole}
                      addVoter={this.addVoter} addProposal={this.addProposal} setVote={this.setVote} />
          <div className="clearfix"></div>
        </section>
        
        <section className="main-container">
            

            <ListVoters  listVoterAddress={this.state.listVoterAddress} />

            <ListProposals  listProposal={this.state.listProposal} worflowstatus={this.state.worflowStatus}/>

            <ListVotes  listVote={this.state.listVote} worflowstatus={this.state.worflowStatus}/>
            <div className="clearfix"></div>
        </section>

        <section className="main-container">
          
          <WinningProposal winningProposalID={this.state.winningProposalID} userRole={this.state.userRole} 
                            worflowstatus={this.state.worflowStatus} contract={this.state.contract} accounts={this.state.accounts} />
          <div className="clearfix"></div>
        </section>
      </div>
    );
  }
}

export default App;
