import gql from 'graphql-tag'
 
export default gql`
  mutation createRecipe(
      $name: String!,
      $ingredients: [String!],
      $instructions: [String!]
    ) {
    createRecipe(input: {
      name: $name, ingredients: $ingredients, instructions: $instructions, 
    }) {
      id
      name
      instructions
      ingredients
    }
  }
`
