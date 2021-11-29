export const updatePVTech = /* GraphQL */ `
  mutation UpdatePVTech(
    $input: Float!
  ) {
    updatePVTech(input: {id: "1", amount: $input}) {
      id
      amount
    }
  }
`;