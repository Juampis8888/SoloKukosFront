import React from 'react';
import { Navigate  } from "react-router-dom";
import TextBox from 'devextreme-react/text-box';
import { Button } from 'devextreme-react/button';
import 'devextreme-react/text-area';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      redirect: false,
      url: '',
      email: '',
      pass:'',
    };
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.postData = this.postData.bind(this);
  }
  
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.url} />;
    }
    return (
      <div className="container">
        <div className="caption">Inicio de sesion</div>
          <TextBox
            width={250}
            mode="email"
            placeholder="Ingrese Email"
            label="Correo Electronico"
            labelMode='static'
            onValueChanged={this.handleChangeEmail} />
   
          <TextBox
            width={250}
            mode="password"
            placeholder="Ingrese Contraseña"
            label="Contraseña"
            labelMode='static'
            onValueChanged={this.handleChangePass}/>
          <Button
            width={150}
            text="Aceptar"
            type="success"
            stylingMode="contained"
            onClick={this.postData}
          />
      </div>
    );
  }

  handleChangePass(event) {
    this.setState({
      pass:event.value,
    });
  }

  handleChangeEmail(event) {
    this.setState({
      email:event.value,
    });
  }

  async postData(){

    const data = { correo: this.state.email, contrasena:  this.state.pass };

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
      this.setState({
        redirect: true,
        url:'/Administrador'
      });
    }
    else if(responseData[0].TipoUsuario === "Cliente")
    { 
      this.setState({
        redirect: true,
        url:'/Cliente'
      });
      cons
    }
  }

}

export default App;