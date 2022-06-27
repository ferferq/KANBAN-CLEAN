export class FieldsRequiredCreateCard extends Error {
  constructor() {
    super('Titulo e descrição são obrigatórios');
    this.name = 'FieldsRequired';
  }
}
