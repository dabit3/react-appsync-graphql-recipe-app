import React from 'react'

import { css } from 'glamor'
import { compose, graphql } from 'react-apollo'
import ListRecipes from './queries/ListRecipes'

class Recipes extends React.Component {
  render() {
    console.log('props:', this.props)
    // console.log('arr: ', JSON.parse(this.props.recipes[1].instructions))
    return (
      <div {...css(styles.container)}>
        <h1>Recipes</h1>
        {
          this.props.recipes.map((r, i) => (
            <div {...css(styles.recipe)} key={i}>
              <p {...css(styles.title)}>Recipe name: {r.name}</p>
              <div>
                <p {...css(styles.title)}>Ingredients</p>
                {
                  r.ingredients.map((ingredient, i2) => (
                    <p key={i2} {...css(styles.subtitle)}>{ingredient}</p>
                  ))
                }
              </div>
              <div>
                <p {...css(styles.title)}>Instructions</p>
                {
                  r.instructions.map((instruction, i3) => (
                    <p key={i3} {...css(styles.subtitle)}>{i3 + 1}. {instruction}</p>
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

const styles = {
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)'
  },
  recipe: {
    boxShadow: '2px 2px 5px rgba(0, 0, 0, .2)',
    marginBottom: 7,
    padding: 14,
    border: '1px solid #ededed'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: 'left'
  }
}

export default compose(
  graphql(ListRecipes, {
    options: {
      fetchPolicy: 'network-only'
    },
    props: props => ({
      recipes: props.data.listRecipes ? props.data.listRecipes.items : [],
    })
  })
)(Recipes)