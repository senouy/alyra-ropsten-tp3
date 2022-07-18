import React from "react";

export default class ListVoters extends React.Component {
    
    render(){
      
        const renderVoters = () => {
          if (this.props.listVoterAddress.length > 0) {
            return <div>
                      <table>
                        <thead>
                          <tr>
                            <th>N°</th>
                            <th>Adresse</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.listVoterAddress.map( (address, index) => (
                          <tr><td>{index+1}</td><td>{address.returnValues._voterAddress}</td></tr>
                          ))}
                        </tbody>
                      </table>
                    </div>;
          }
          else{
            return <em>"Pas de votant enregistré"</em>
          }
        }

        return(
          <div className="three-columns-container">
            <h3>1. Liste des votants enregistrés</h3>
            {renderVoters()}
          </div>
        )
    }
}