import React from "react";
import * as CONSTANTS from "../constants";

export default class Actions extends React.Component {

    hasVoted(){
        let hasVoter = false;

        this.props.listVote.forEach(vote => {
            if(this.props.accounts[0] === vote.returnValues._voter){
              hasVoter = true;
            }
        });

        return hasVoter;
    }

    render(){
        const isOwner = this.props.userRole === CONSTANTS.USER_ROLE.OWNER;
        const isVoter = this.props.userRole === CONSTANTS.USER_ROLE.VOTER;

        //Display button to add vote only for the owner and during REGISTERING_VOTERS status
        const renderButtonAddVoter = () => {
            if (isOwner && this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.REGISTERING_VOTERS) {
              return <div>
                        <input type="text" id="address_new_voter_value" />
                        <button onClick={this.props.addVoter}>Ajouter un votant</button>
                    </div>;
            } 
            return;
        }

        //Display button to add proposal only for voter and during PROPOSAL_REGISTRATION_STARTED status
        const renderButtonAddProposal = () => {
            if (isVoter && this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_STARTED) {
              return <div>
                        <input type="text" id="new_proposal_value" />
                        <button onClick={this.props.addProposal}>Ajouter une proposition</button>
                    </div>;
            } 
            return;
        }

        //Display button to set vote only for voter and during VOTING_SESSION_STARTED status
        const renderButtonSetVote = () => {
            if (isVoter && this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.VOTING_SESSION_STARTED) {
                if(this.hasVoted()){
                    return <em>Vous avez déjà voté</em>
                }
                else {
                    return <div>
                        <input type="text" id="set_vote_value" placeholder="Saisir un identifiant de proposition" />
                        <button onClick={this.props.setVote}>Voter</button>
                    </div>;
                }
              
            } 
            return;
        }

        return(
            <div className="two-columns-container">
                <h3>Action</h3>
                {renderButtonAddVoter()}
                {renderButtonAddProposal()}
                {renderButtonSetVote()}
            </div>
        )
    }
}