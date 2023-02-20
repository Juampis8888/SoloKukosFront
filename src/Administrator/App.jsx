import React from 'react';
import DataGrid, {
  Column, Editing, Paging, Lookup, ValidationRule
} from 'devextreme-react/data-grid';

class App extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      data: [],
      categorys: [],
    };

    this.componentDidMountCreateProduct = this.componentDidMountCreateProduct.bind(this)
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/category/getcategory')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.state.categorys = data
      this.componentDidMountData();
    });
  }

  componentDidMountData(){
    fetch('http://localhost:3000/product/getproducts')
      .then(response => response.json())
      .then(data => {
        this.setState({ data })
      });
  }

  componentDidMountCreateProduct(e) {
    const dataUpdate = {
      nombre:e.data.Nombre, 
      precio:e.data.Precio, 
      referencia:e.data.Referencia, 
      talla:e.data.Talla, 
      color:e.data.Color, 
      idcategoria:e.data.IdCategoria, 
      urlimages:e.data.UrlImages}

    fetch('http://localhost:3000/product/createproduct', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(dataUpdate)
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  componentDidMountUpdateProduct(e) {
    const dataUpdate = {
      nombre:e.data.Nombre, 
      precio:e.data.Precio, 
      referencia:e.data.Referencia, 
      talla:e.data.Talla, 
      color:e.data.Color, 
      idcategoria:e.data.IdCategoria, 
      urlimages:e.data.UrlImages, 
      id:e.data.Id}
    console.log(dataUpdate);
    fetch('http://localhost:3000/product/updateproduct', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(dataUpdate)
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  componentDidMountDeleteProduct(e) {
    const dataUpdate = { 
      id:e.data.Id}
    console.log(dataUpdate);
    fetch('http://localhost:3000/product/deleteproduct', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(dataUpdate)
    }).then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

  render() {
    return (
      
      <div id="tree-list-demo">
        <DataGrid
          id="gridContainer"
          dataSource={this.state.data}
          allowColumnReordering={true}
          showBorders={true}
          onInitNewRow={this.onInitNewRow}
          onRowInserted={this.componentDidMountCreateProduct}
          onRowUpdated={this.componentDidMountUpdateProduct}
          onRowRemoved={this.componentDidMountDeleteProduct}
          onSaving={this.onSaving}
          onSaved={this.onSaved}
          onEditCanceling={this.onEditCanceling}
          onEditCanceled={this.onEditCanceled}>

          <Paging enabled={true} />
          <Editing
            mode="form"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true} />
          <Column dataField="Nombre">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="Precio" caption="Precio">
            <ValidationRule type="required" />
          </Column>
          <Column
            dataField="IdCategoria"
            caption="Categoria"
          > 
            <ValidationRule type="required" />
            <Lookup dataSource={this.state.categorys} displayExpr="title" valueExpr="Id" />
          </Column>
          <Column dataField="Referencia" caption="Referencia">
            <ValidationRule type="required" />
          </Column>
          <Column  dataField="Talla">
            <ValidationRule type="required" />
          </Column>
          <Column dataField="Color" >
            <ValidationRule type="required" />
          </Column>
          <Column  dataField="UrlImages" caption="Url Imagen">
            <ValidationRule type="required" />
          </Column>
        </DataGrid>
      </div>
    );
  }

  onEditorPreparing(e) {
    if (e.dataField === 'IdCategoria' && e.row.data.ID === 1) {
      e.editorOptions.disabled = true;
      e.editorOptions.value = null;
    }
  }

  onInitNewRow(e) {
    e.data.Id = 1;
  }
}

export default App;
