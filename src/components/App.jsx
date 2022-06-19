import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar'

export class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({imageName})
  };

  render() {
    return (
      <div>
        <header>
          <Searchbar
            // onSubmit це пропси, а не слухач подій
            onSubmit={this.handleFormSubmit}
          />
        </header>
      </div>
    )
  };
};
