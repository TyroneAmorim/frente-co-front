const serverError = 'Ocorreu um erro. Por favor, tente novamente mais tarde';
const errorsMessages = {
  login: [
    [400, 'Verifique os dados informados'],
    [401, 'Usuário ou senha incorretos'],
    [500, serverError],
  ],
  cadastro: [
    [400, 'Verifique os dados informados'],
    [409, 'Já existe um usuário cadastrado com esses dados'],
    [500, serverError],
  ],
};

const getErrorByCode = (errorObject: any, codError: number): string => {
  return errorObject.filter((errorObj: any) => errorObj[0] === codError)[0][1];
};

export { errorsMessages, getErrorByCode };
