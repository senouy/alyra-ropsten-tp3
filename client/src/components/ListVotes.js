import React from "react";
import * as CONSTANTS from "../constants";

export default class ListVotes extends React.Component {
    
    render(){
        const renderContainer = () => {
          if (this.props.worflowstatus >= CONSTANTS.WORKFLOW_STATUS.VOTING_SESSION_STARTED) {
            return <div>
                      <h3>3. Liste des votes</h3>
                      {renderContent()}
                    </div>;
          }
          
          return ;
        }

        const renderContent = () => {
          if (this.props.listVote.length > 0) {
            return <table>
                    {this.props.listVote.map( (vote) => (
                      <tr>
                        <td>{vote.returnValues.proposalId}</td>
                        <td>{vote.returnValues.voter}</td>
                      </tr>
                      ))}
                  </table>;
          }
          else{
            return "Pas de vote enregistré"
          }
        }

        return(
          <div className="three-columns-container">
            {renderContainer()}
          </div>
        )
    }
}