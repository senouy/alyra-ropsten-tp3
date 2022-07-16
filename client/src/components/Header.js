import React from "react";

export default class Header extends React.Component {
    getRoleString(){
        switch(this.props.userRole){
            case 1:
                return "Visiteur";
            case 2:
                return "Votant";
            case 3:
                return "Proprietaire du contrat";
            default:
                return "Role inconnu";
        }
    }

    render(){
        return(
            <header className="header">
                <h1>Voting Dapp</h1>
            
                    Mon role <span style={{'font-weight':'bold'}}>{this.getRoleString()} - {this.props.addr}</span>
                
                <div id="error-message" className="hide">
                    Error
                </div>
            </header>
        )
    }
}