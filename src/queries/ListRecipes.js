import gql from 'graphql-tag';
 
export default gql`
query listRecipes {
  listRecipes  {
    items {
      name
      id
      ingredients
      instructions
    }
  }
}`