import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    inputValue: '',
    comments: [],
  };
  getComments = () => {
    axios
      .get('http://localhost:3000/comments')
      .then((res) => this.setState({ comments: res.data }))
      .catch((err) => console.log(err.message));
  };
  componentDidMount() {
    this.getComments();
  }

  onAdd = () => {
    if (!this.state.inputValue) {
      return;
    }
    axios
      .post('http://localhost:3000/comments', { data: this.state.inputValue })
      .then((res) => {
        this.getComments();
        this.setState({ inputValue: '' });
        console.log('GET', res.data);
      })
      .catch((err) => console.log(err.message));
  };

  onDelete = (id) => {
    axios
      .delete(`http://localhost:3000/comments/${id}`)
      .then(() => {
        this.getComments();
      })
      .catch((err) => console.log(err));
  };

  deleteAll = async () => {
    for (let comment of this.state.comments) {
      console.log(comment);
      await axios
        .delete(`http://localhost:3000/comments/${comment.id}`)
        .then(() => {})
        .catch((err) => console.log(err));
    }
    this.getComments();
  };

  render() {
    return (
      <div>
        <h1
          style={{
            textAlign: 'center',
            color: 'deepskyblue',
            textDecoration: 'underline',
          }}
        >
          Comments Feed
        </h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '45%',
            }}
          >
            {!this.state.comments.length ? (
              <div style={{ color: 'red', textAlign: 'center' }}>
                No comments Found
              </div>
            ) : (
              this.state.comments.map((cmt) => {
                return (
                  <div
                    key={cmt.id}
                    style={{
                      border: '1px solid black',
                      marginBottom: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '5px',
                    }}
                  >
                    <button
                      style={{ height: '25px', margin: '10px' }}
                      onClick={() => this.onDelete(cmt.id)}
                    >
                      X
                    </button>
                    <p>{cmt.data}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            value={this.state.inputValue}
            placeholder="Enter comment"
            style={{ padding: '11px' }}
            onInput={(e) => this.setState({ inputValue: e.target.value })}
          />
          <button onClick={this.onAdd}>ADD</button>
          <button style={{ marginLeft: '2rem' }} onClick={this.deleteAll}>
            Delete All
          </button>
        </div>
      </div>
    );
  }
}

export default App;
