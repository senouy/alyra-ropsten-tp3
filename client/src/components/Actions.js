import React from "react";
import * as CONSTANTS from "../constants";

export default class Actions extends React.Component {

    isOwner = false
    isVoter = false

    constructor(props) {
        super(props);
        this.isOwner = props.userRole === CONSTANTS.USER_ROLE.OWNER;
        this.isVoter = props.userRole === CONSTANTS.USER_ROLE.VOTER;
    }

    render(){
        //Display button to add vote only for the owner and during REGISTERING_VOTERS status
        const renderButtonAddVoter = () => {
            if (this.isOwner && this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.REGISTERING_VOTERS) {
              return <div>
                        <input type="text" id="address_new_voter_value" />
                        <button onClick={this.props.addVoter}>Ajouter un votant</button>
                    </div>;
            } 
            return;
        }

        //Display button to add proposal only for voter and during PROPOSAL_REGISTRATION_STARTED status
        const renderButtonAddProposal = () => {
            if (this.isVoter && this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_STARTED) {
              return <div>
                        <input type="text" id="new_proposal_value" />
                        <button onClick={this.props.addProposal}>Ajouter une proposition</button>
                    </div>;
            } 
            return;
        }

        //Display button to set vote only for voter and during VOTING_SESSION_STARTED status
        const renderButtonSetVote = () => {
            if (this.isVoter && this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.VOTING_SESSION_STARTED) {
              return <div>
                        <input type="text" id="set_vote_value" placeholder="Saisir un identifiant de proposition" />
                        <button onClick={this.props.setVote}>Voter</button>
                    </div>;
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