import React from 'react';

import { TabPanel } from 'devextreme-react/tab-panel';

class Tab extends React.Component {
    
  constructor(props) {
    super(props);
  
    this.state = {
      data: [],
      currentCategory: ''
    };
  }
  
    componentDidMount() {
      fetch('http://localhost:3000/category/getcategory')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.setState({ data })
        });
    }

    componentDidMountCategory() {
      const info = { categoria: this.state.currentCategory};
      console.log(info);
      fetch('http://localhost:3000/category/getidcategory', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(info)
      }).then(response => response.json())
      .then(data => {
        console.log(data);
        const info = { idcategoria: data[0].Id};
        console.log(info);
        fetch('http://localhost:3000/product/getproductcategory', {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify(info)
        }).then(response => response.json())
        .then(data => {
          console.log(data)
        });
      });
    }
  
    render() {
      return (
        <TabPanel dataSource={this.state.data} onSelectionChanged={event => {
          this.setState({ currentCategory:event.addedItems[0].title});
          this.componentDidMountCategory()}} itemTitleTemplate="title">
        </TabPanel>
      );
    }
}

export default Tab;

