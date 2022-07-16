import React from "react";
import * as CONSTANTS from "./../constants";

export default class WinningProposal extends React.Component {
    
    state = { winningProposalDescription: null}
    isVoter = false

    constructor(props) {
      super(props);
      this.isVoter = props.userRole === CONSTANTS.USER_ROLE.VOTER;
    }
    
    componentDidMount = async () => {
        if(this.isVoter){
            let winningProposal = await this.props.contract.methods.getOneProposal(parseInt(this.props.winningProposalID)).call({from: this.props.accounts[0]});
            this.setState({winningProposalDescription : winningProposal.description});
        }
    }
    
    render(){
        const renderWinningProposal = () => {
          if (this.props.worflowstatus === CONSTANTS.WORKFLOW_STATUS.VOTES_TALLIED) {
            return <div>
                      <h3>Proposition gagnante</h3>
                      <p>
                        Identifiant : {this.props.winningProposalID}
                      </p>
                      {renderProposalDescription()}
                    </div>;
          }
        }

        const renderProposalDescription = () => {
            if (this.isVoter) {
              return <div id="winning-proposal-description">{this.state.winningProposalDescription}</div>;
            } else {
              return ;
            }
          }

        return(
            <div>
              {renderWinningProposal()}
            </div>
        )
    }
}