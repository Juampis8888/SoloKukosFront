import React from 'react';
import { Navigate  } from "react-router-dom";
import Form, {Item, GroupItem} from 'devextreme-react/form';
import { Button } from 'devextreme-react/button';
import 'devextreme-react/text-area';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      url: ''
    };
  
    this.document = '';
    this.meesage = '';
    this.handleChange = this.handleChange.bind(this);
    this.postData = this.postData.bind(this);
    this.showInfo = this.showInfo.bind(this);
    this.hideInfo = this.hideInfo.bind(this);

    this.closeButtonOptions = {
      text: 'Aceptar',
      type: "success",
      stylingMode: "outlined",
      onClick: this.hideInfo,
    };
  }
  
  render() {
    if (this.state.popupVisible) {
      return <Navigate to='/client' />;
    }
    return (
      <div className="options">
        <div className="caption">Ingresar su documento</div>
        
        <Form labelLocation="top" onFieldDataChanged={this.handleChange}>
          <Item dataField="Documento" value={this.document} editorType="dxNumberBox"/>
        </Form>
        <Button
          width={120}
          text="Contained"
          type="success"
          stylingMode="contained"
        />
                <Button
          width={120}
          text="Contained"
          type="success"
          stylingMode="contained"
        />
                <Button
          width={120}
          text="Contained"
          type="success"
          stylingMode="contained"
          
        />
      </div>
    );
  }

  handleChange(event) {
    this.setDocument(event.value);
    console.log('A name was submitted:' + this.document);
    console.log(this.getDocument());
  }

  setDocument(value){
    this.document = value;
  }

  async postData(){

    const data = { correo: 'juampa8888@gmail.com', contrasena: '1093225987' };

    const response = await fetch('http://localhost:3000/users/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    });

    console.log(response);

    const responseData = await response.json();

    console.log(responseData[0].TipoUsuario);

    if(responseData[0].TipoUsuario === "Administrador")
    { 
      console.log(this.state.popupVisible);
      this.setState({
        popupVisible: true,
        url:'/administrator'
      });
    }
    else if(responseData[0].TipoUsuario === "Cliente")
    {
      console.log(this.state.popupVisible);
      this.setState({
        popupVisible: true,
        url:'/client'
      });
    }
  }


  showInfo(){
    this.setState({
      positionOf: "#center",
      popupVisible: true,
    });
  }
  
  hideInfo(){
    this.setState({
      popupVisible: false,
    });
  }

}

export default App;
