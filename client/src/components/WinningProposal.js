import React from "react";
import * as CONSTANTS from "./../constants";

export default class WinningProposal extends React.Component {
    
    state = {winningProposalDescription: null};

    componentDidMount(){
      const isVoter = this.props.userRole === CONSTANTS.USER_ROLE.VOTER;

      if(isVoter){
        this.props.contract.methods.getOneProposal(parseInt(this.props.winningProposalID)).call({from: this.props.accounts[0]}).then(
          (result) => {
            this.setState({winningProposalDescription : result.description});
          }
          );
        
      }
    }

    componentDidUpdate(prevProps){
      if(prevProps.userRole !==  this.props.userRole){
        const isVoter = this.props.userRole === CONSTANTS.USER_ROLE.VOTER;
        
        if(isVoter){
          this.props.contract.methods.getOneProposal(parseInt(this.props.winningProposalID)).call({from: this.props.accounts[0]}).then(
            (result) => {
              this.setState({winningProposalDescription : result.description});
            }
            );
        }
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
            const isVoter = this.props.userRole === CONSTANTS.USER_ROLE.VOTER;

            if (isVoter) {
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