import React from "react";
import * as CONSTANTS from "./../constants";

export default class ListProposals extends React.Component {
    
    render(){
        const renderContainer = () => {
          if (this.props.worflowstatus >= CONSTANTS.WORKFLOW_STATUS.PROPOSAL_REGISTRATION_STARTED) {
            return <div>
                      <h3>2. Liste des propositions</h3>
                      {renderContent()}
                    </div>;
          }
          
          return ;
        }

        const renderContent = () => {
          if (this.props.listProposal.length > 0) {
            return <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Description</th>
                      </tr>
                        </thead>
                        <tbody>
                          {this.props.listProposal.map( (proposal) => (
                            <tr>
                              <td>{proposal.id}</td>
                              <td>{proposal.desc}</td>
                            </tr>
                          ))}
                        </tbody>
                    </table>;
          }
          else{
            return <em>"Pas de proposition enregistrée"</em>
          }
        }

        return(
          <div className="three-columns-container">
            {renderContainer()}
          </div>
        )
    }
}