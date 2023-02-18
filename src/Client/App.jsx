import React from 'react';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';
import Form, {Item, GroupItem} from 'devextreme-react/form';
import 'devextreme-react/text-area';

class App extends React.Component {

  constructor() {
    super();

    this.document = '';
    this.meesage = '';

    this.state = {
      popupVisible: false,
    };

    this.buttonOptionsingresar = {
      text:"Ingresar",
      type: "success",
      width: "800px",
      stylingMode: "outlined",
      onClick: this.setDocument,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setDocument = this.setDocument.bind(this);
    this.getDocument = this.getDocument.bind(this);
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
    return (
      <div className="options">
        <div className="caption">Ingresar su documento</div>
        
        <Form labelLocation="top" onFieldDataChanged={this.handleChange}>
          <Item dataField="Documento" value={this.document} editorType="dxNumberBox"/>
          
          <Item itemType="button" buttonOptions={this.buttonOptionsingresar} />
        </Form>
        <div id="container">
        <Popup
              visible={this.state.popupVisible}
              onHiding={this.hideInfo}
              dragEnabled={false}
              hideOnOutsideClick={true}
              showCloseButton={false}
              showTitle={true}
              title="Notificación"
              container=".dx-viewport"
              width={400}
              height={200}
            >
              <Position
                at="center"
                my="center"
                collision="fit"
              />
              <ToolbarItem
                widget="dxButton"
                toolbar="bottom"
                location="center"
                options={this.closeButtonOptions}
              />
              <Form>
                <GroupItem colCount={2}>
                  <div>{this.message}</div>
                </GroupItem>
              </Form>
            </Popup>
          </div> 
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

  getDocument() {
    console.log('A name was submitted: ' + this.document)
    return this.document;   
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
