import React from 'react'
import { css } from 'glamor'
import { graphql } from 'react-apollo'
import uuidV4 from 'uuid/v4'

import CreateRecipe from './mutations/CreateRecipe'
import ListRecipes from './queries/ListRecipes'

class AddRecipe extends React.Component {
  state = {
    name: '',
    ingredient: '',
    ingredients: [],
    instruction: '',
    instructions: [],
  }
  onChange = (key, value) => {
    this.setState({ [key]: value })
  }
  addInstruction = () => {
    if (this.state.instruction === '') return
    const instructions = this.state.instructions
    instructions.push(this.state.instruction)
    this.setState({
      instructions,
      instruction: ''
    })
  }
  addIngredient = () => {
    if (this.state.ingredient === '') return
    const ingredients = this.state.ingredients
    ingredients.push(this.state.ingredient)
    this.setState({
      ingredients,
      ingredient: ''
    })
  }
  addRecipe = () => {
    const { name, ingredients, instructions } = this.state
    this.props.onAdd({
      id: uuidV4(),
      ingredients,
      instructions,
      name
    })
    this.setState({
      name: '',
      ingredient: '',
      ingredients: [],
      instruction: '',
      instructions: [],
    })
  }
  render() {
    return (
      <div {...css(styles.container)}>
        <h2>Create Recipe</h2>
        <input
          value={this.state.name}
          onChange={evt => this.onChange('name', evt.target.value)}
          placeholder='Recipe name'
          {...css(styles.input)}
        />
        <div>
          <p>Recipe Ingredients:</p>
          {
            this.state.ingredients.map((ingredient, i) => <p key={i}>{ingredient}</p>)
          }
        </div>
        <input
          value={this.state.ingredient}
          onChange={evt => this.onChange('ingredient', evt.target.value)}
          placeholder='Ingredient'
          {...css(styles.input)}
        />
        <button onClick={this.addIngredient} {...css(styles.button)}>Add Ingredient</button>

        <div>
          <p>Recipe Instructions:</p>
          {
            this.state.instructions.map((instruction, i) => <p key={i}>{`${i + 1}. ${instruction}`}</p>)
          }
        </div>
        <input
          value={this.state.instruction}
          onChange={evt => this.onChange('instruction', evt.target.value)}
          placeholder='Instruction'
          {...css(styles.input)}
        />
        <button onClick={this.addInstruction} {...css(styles.button)}>Add Instruction</button>

        <div {...css(styles.submitButton)} onClick={this.addRecipe}>
          <p>Add Recipe</p>
        </div>
      </div>
    )
  }
}

export default graphql(CreateRecipe, {
  props: props => ({
    onAdd: recipe => props.mutate({
      variables: recipe,
      optimisticResponse: {
        __typename: 'Mutation',
        createRecipe: { ...recipe,  __typename: 'Recipe' }
      },
      update: (proxy, { data: { createRecipe } }) => {
        const data = proxy.readQuery({ query: ListRecipes });
        data.listRecipes.items.push(createRecipe);
        proxy.writeQuery({ query: ListRecipes, data });
      }
    })
  })
})(AddRecipe)

const styles = {
  button: {
    border: 'none',
    background: 'rgba(0, 0, 0, .1)',
    width: 250,
    height: 50,
    cursor: 'pointer',
    margin: '15px 0px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: 'left'
  },
  input: {
    outline: 'none',
    border: 'none',
    borderBottom: '2px solid #00dd3b',
    height: '44px',
    fontSize: '18px',
  },
  textarea: {
    border: '1px solid #ddd',
    outline: 'none',
    fontSize: '18px'
  },
  submitButton: {
    backgroundColor: '#00dd3b',
    padding: '8px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .85,
    cursor: 'pointer',
    ':hover': {
      opacity: 1
    }
  }
}
