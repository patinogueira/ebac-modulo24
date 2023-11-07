const req = require('supertest');
const API_URL = process.env.API_URL;
const { getAccessToken } = require('../utils/request');
const faker = require('faker');
const contrato = require('../contratos/enderecos.contrato');

describe('endereços de usuário', () => {
    let token
    let id
    beforeAll(async () => {
        token = await getAccessToken('admin', 'admin')
    });
    it('Deve validar contrato de enderecos', async () => {
        await req(API_URL)
            .get('/addresses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                console.log(response.body);
                expect(typeof response.body).toBe('object');
                return contrato.validateAsync(response.body);
            })
    });

    it('(HealthCheck) deve pegar o token de acesso', () => {
        req(API_URL)
            .post('/login')
            .send({
                "username": "admin",
                "password": "admin"
            })
            .set('Accept', 'application/json')
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.body.accessToken).not.toBe(undefined)
            })
    });
    it('deve listar os enderecos cadastrados ', async () => {
        await req(API_URL)
            .get('/addresses')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body).toBeInstanceOf(Array)
            })
    });
    it('(E2Eendereco) deve cadastrar um endereco valido', async () => {
        let address_1 = faker.address.streetAddress()
        await req(API_URL)
            .post('/addresses')
            .send({
                "address_1": address_1,
                "address_2": faker.address.streetName(),
                "city": faker.address.city(),
                "state": faker.address.state(),
                "zip": 0
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.body.updatedAt).not.toBe(undefined)
                expect(response.body.address_1).toEqual(address_1)
                id = response.body.id
            })
    });

})