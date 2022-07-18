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
                      <thead>
                          <tr>
                            <th>ID Prop</th>
                            <th>Adresse</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.props.listVote.map( (vote) => (
                          <tr>
                            <td>{vote.returnValues._proposalId}</td>
                            <td>{vote.returnValues._voter}</td>
                          </tr>
                          ))}
                        </tbody>
                  </table>;
          }
          else{
            return <em>Pas de vote enregistré</em>
          }
        }

        return(
          <div className="three-columns-container">
            {renderContainer()}
          </div>
        )
    }
}