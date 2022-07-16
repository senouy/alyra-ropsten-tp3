import React from "react";
import * as CONSTANTS from "./../constants";

export default class WorkFlowStatus extends React.Component {

    isOwner = false

    constructor(props) {
        super(props);
        this.isOwner = props.userRole === CONSTANTS.USER_ROLE.OWNER;
    }

    getStatusString(){
        switch(this.props.worflowstatus){
            case CONSTANTS.WORKFLOW_STATUS.REGISTERING_VOTERS: 
                return 'Registering Voters';
            case CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_STARTED: 
                return 'Proposals Registration Started';
            case CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_ENDED: 
                return 'Proposals Registration Ended';
            case CONSTANTS.WORKFLOW_STATUS.VOTING_SESSION_STARTED: 
                return 'Voting Session Started';
            case CONSTANTS.WORKFLOW_STATUS.VOTIN_SESSION_ENDED: 
                return 'Voting Session Ended';
            case CONSTANTS.WORKFLOW_STATUS.VOTES_TALLIED: 
                return 'Votes Tallied';
            default: 
                return 'Unknown status';
        }
    }

    render(){
        //Display button to switch status only for the owner and if the voting process is not finished yet
        const renderButtonSwitchStep = () => {
            if (this.isOwner && this.props.worflowstatus !== CONSTANTS.WORKFLOW_STATUS.VOTES_TALLIED) {
              return <div>
                        <button onClick={this.props.switchStatus}>Passer à l'étape suivante</button>
                    </div>;
            } 
            return ;
          }

        return(
            <div className="two-columns-container">
                <h3>Statut en cours <span id="workflow-status">{this.getStatusString()}</span></h3>
                {renderButtonSwitchStep()}
            </div>
        )
    }
}