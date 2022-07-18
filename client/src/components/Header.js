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
        const renderHeader = () => {
            if (this.props.addr === null) {
              return <div>
                        <h1>Voting Dapp</h1>
                    
                        Veuillez connecter votre wallet    
                    </div>;
            } 
            return <div>
                        <h1>Voting Dapp</h1>
                    
                            Mon role <span style={{fontWeight:'bold'}}>{this.getRoleString()} - {this.props.addr}</span>
                        
                        
                    </div>;
        }

        return( <header className="header">
                    {renderHeader()}
                    <div id="toast-message" className="hide">
                        Error
                    </div>
                </header>
        )
    }
}