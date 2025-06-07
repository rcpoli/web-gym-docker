const request = require('supertest');
const app = require('../app');

describe('POST /api/contacto', () => {
  test('debería responder con un mensaje de caso satisfactorio', async () => {
    const testData = {
      nombre: 'Test User',
    };

    const response = await request(app).post('/api/contacto').send(testData);

    expect(response.status).toBe(200);
    expect(response.body.éxito).toBe(true);
    expect(response.body.mensaje).toBe('¡Gracias Test User, mensaje recibido!');
  });

  test('debería hacer log de la información de contacto', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const testData = {
      nombre: 'Test User',
    };

    await request(app).post('/api/contacto').send(testData);

    expect(consoleSpy).toHaveBeenCalledWith('Contacto entrante:', testData);
    consoleSpy.mockRestore();
  });
});
