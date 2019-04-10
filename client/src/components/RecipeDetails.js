import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import { getRecipe, deleteRecipe } from '../actions/recipesActions';

class RecipeDetails extends Component {
  state = {
    showModal: false
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getRecipe(id);
  }

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  onDelete = () => {
    this.setState({ showModal: false });
    this.props.deleteRecipe(this.props.recipe._id);
  };

  render() {
    const { recipe } = this.props;

    if (!recipe) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <div className="mt-4">
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
          <h2 className="mt-3">{recipe.name}</h2>
          <p>Description: {recipe.description}</p>
          <p>
            {recipe.servings !== null && recipe.servings !== 0
              ? 'Servings: ' + recipe.servings
              : null}
          </p>
          <h4>Ingredients</h4>
          <ListGroup className="mb-4">
            {recipe.ingredients.map((ingredient, index) => {
              return <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>;
            })}
          </ListGroup>
          <h4>Directions</h4>
          <ListGroup>
            {recipe.directions.map((direction, index) => {
              return (
                <ListGroup.Item key={index}>
                  {index + 1}. {direction}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          {this.props.user && this.props.user._id === recipe._user ? (
            <div className="mt-3">
              <Link
                to={{
                  pathname: `/recipes/${recipe._id}/edit`,
                  state: this.props.recipe
                }}
                className="btn btn-primary mr-3">
                Edit
              </Link>
              <Button variant="danger" onClick={this.handleOpen}>
                Delete
              </Button>
            </div>
          ) : null}
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete {recipe.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {recipe.name}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.onDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth, recipes }, ownProps) => {
  return {
    user: auth.user,
    recipe: recipes[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { getRecipe, deleteRecipe }
)(RecipeDetails);
